const UserModel = require('../models/user');

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create new user
exports.createUser = async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    createdDate: req.body.createdDate || Date.now() // optional, use current date if not provided
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }

    if (req.body.password !== undefined) {
      user.password = req.body.password;
    }

    if (req.body.createdDate !== undefined) {
      user.createdDate = req.body.createdDate;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
