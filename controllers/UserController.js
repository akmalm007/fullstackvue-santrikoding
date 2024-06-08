const express = require("express");

const prisma = require("../prisma/client");

const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

//Function find all user
const findUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.status(200).send({
            success: true,
            message: "Get all users usccessfully",
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

// Function create user
const createUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            },
        });
        res.status(201).send({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const findUserById = async (req, res) => {
    //get ID from params
    const { id } = req.params;

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        res.status(200).send({
            success: true,
            message: `Get user by Id :${id}`,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
}

module.exports = { findUsers, createUser, findUserById };
