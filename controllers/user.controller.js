const User = require("../models/User.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  addUser: async (req, res) => {
    try {
      const { name, surname, phone, icon, login, password } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.ROUNDS)
      );

      const user = await User.create({ name: name, surname: surname, phone: phone, icon: icon, login: login, password: hash });

      await Cart.create({
        userId: user._id
      })
      await Favorite.create({
        userId: user._id
      })
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  },

  patchUser: async (req, res) => {
    try {
      const patch = await User.findByIdAndUpdate(req.params.id, {
        ...req.body

      } 
    )
     res.json('Юзер изменен')
      res.json('Юзер изменен')
    } catch (error) {
      res.json("error");
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });

    if (!candidate) {
      return res.json("Неверный логин или пароль");
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.json("Неверный логин или пароль");
    }

    const payload = {
      id: candidate._id,
      login: login.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.json({
        token,
        id: payload.id,
        login: payload.login
    });
  },

getProfile: async (req, res) => {
 try {
      const profile = await User.findById(req.params.id
    )
     res.json(profile)
    } catch (error) {
      res.json("error");
    }
},
  getUsers: async (req, res) => {
    try {
      res.json(await User.find());
    } catch (error) {
      res.json("error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const dele = await User.findByIdAndRemove(req.params.id);
      res.json("Юзер удален");
    } catch (error) {
      res.json("error");
    }
  },
};
