const router = require('express').Router();
const { Staff, Student, Equipment, Ticket, School } = require('../models/');
const withAuth = require('../utils/auth');

// homepage route
router.get('/', async (req,res)=>{
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets all info for specific staff member that's signed in on their dashboard
router.get('/dashboard', withAuth, async (req, res)=>{
    try {
        const staffData = await Staff.findByPk(req.session.staff_id, {
            attributes: {
                exclude: ['password']
            },
            include: [{ model: Student }, { model: School }, { model: Equipment }, { model: Ticket },],
        });
        const staff = staffData.get({ plain:true });
        res.render('dashboard', {
            ...staff,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// redirects to dash once logged in
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;
