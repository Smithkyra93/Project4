const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();
const port = 3000;

// Simulate a user "database"
const users = [
  { username: 'user1', password: '$2a$10$9U6WvMGy0VEdzexYw2mNm6dDGRk.nwKKC.Qg5XBMO9sH0lOmJtmK2' } // hashed password for 'password123'
];

// Middleware
app.use(express.static('public')); // Serve static files (e.g., CSS)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes

// Home route (redirect if logged in)
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('home', { username: req.session.user.username });
  }
  res.redirect('/login');
});

// Login route (show login page)
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username);
  if (user) {
    // Compare password with hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // Store user in session
        req.session.user = user;
        return res.redirect('/');
      } else {
        res.send('Invalid username or password');
      }
    });
  } else {
    res.send('Invalid username or password');
  }
});

// Registration route (show registration page)
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Validate if passwords match
  if (password !== confirmPassword) {
    return res.send('Passwords do not match');
  }

  // Check if user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.send('Username already exists');
  }

  // Hash the password and save the new user
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.send('Error hashing password');
    }

    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    res.send('Registration successful! You can now log in.');
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
