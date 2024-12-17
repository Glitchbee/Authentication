const { User, Info } = require('../models/user');

module.exports.logics = {
    // demoHash: async (req, res) => {
    //     const user = new User({ username: 'Jessie', email: 'jessie223@gmail.com', education: 'Bsc', hobbies: ['Cooking', 'Drawing', 'Marketing'] });
    //     const newUser = await User.register(user, 'cook');
    //     res.send(newUser);
    // }
    info: async (req, res) => {
        const { _id } = req.user;
        const user = await User.findById(_id).populate('addlInfo');
        res.render('info', { user });
    },

    renderRegister: (req, res) => {

        res.render('userAuth/register')
    },

    createNewUser: async (req, res, next) => {
        try {
            const { username, password, email } = req.body;
            const user = new User({ username, email });
            const regUser = await User.register(user, password);

            req.login(regUser, (err) => {
                if (err) return next(err);

                req.flash('success', 'Registered new user successfully...')
                res.redirect('/user/login')
            })

        }
        catch (e) {
            req.flash('error', e.message);
            res.redirect('/user/register')
        }

    },

    renderLogin: (req, res) => {
        res.render('userAuth/login')
    },

    authUserLogin: async (req, res) => {
        req.flash('success', 'Welcome back...');
        const redirectURL = req.session.returnTo || '/user/secret';
        delete req.session.returnTo;
        res.redirect(redirectURL);
    },

    authUserLogout: async (req, res, next) => {
        req.logout(function (err) {
            if (err) return next(err);

            req.flash('success', 'Successfully logged out...');
            res.redirect('/user/login');
        })
    },

    renderMoreInfo: async (req, res) => {
        const { _id } = req.user;
        const user = await User.findById(_id);
        res.render('moreinfo', { user });
    },

    addMoreUserInfo: async (req, res) => {
        const { id } = req.params;
        const { education, hobbies } = req.body;
        const hobby = hobbies.split(',').map(h => h.trim());
        // console.log(hobby);
        // console.log(hobby.length);
        const user = await User.findById(id);
        const newInfo = new Info({ education, hobbies: hobby });
        user.addlInfo.push(newInfo);
        // await newInfo.save();
        // await user.save();
        await Promise.all([newInfo.save(), user.save()]);
        req.flash('success', 'Successfully added additional information :):):)');
        res.redirect('/user/secret')

    }
}