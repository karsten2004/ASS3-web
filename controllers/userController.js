const userModel = require('../models/userModel');

exports.view = async (req, res) => {
  // User the connection
  try {
    let users = await userModel.getUsers();
    let removedUser = req.query.removed;
    res.render('home', { rows: users, removedUser });
  } catch (e) {
    console.log(e);
  }
}

// Find User by Search
exports.find = async (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  try {
    rows = await userModel.findUser(searchTerm);
    res.render('home', { rows });
  } catch (e) {
    console.log(e);
  }
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  try{
  // User the connection
  await userModel.createUser(first_name, last_name, email, phone, comments)
  res.render('add-user', { alert: 'User added successfully.' });
  } catch (e){
    console.log(e);
  }
}


// Edit user
exports.edit = async (req, res) => {
  // User the connection
  try{
  rows = await userModel.getUser(req.params.id);
      res.render('edit-user', { rows });
  } catch (e){
    console.log(e);
  }
}


// Update User
exports.update = async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  const id = req.params.id;

  try{
    await userModel.updateUser( first_name, last_name, email, phone, comments, id );
    rows = await userModel.getUser(id);
    res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
  } catch(e){
    console.log(e);
  }
}

// Delete User
exports.delete = async (req, res) => {
  try{
    const id = req.params.i;
    await userModel.deleteUser(id)
    let removedUser = encodeURIComponent('User successeflly removed.');
    res.redirect('/?removed=' + removedUser);
  } catch(e){
    console.log(e);
  }
}

// View Users
exports.viewall = async (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}