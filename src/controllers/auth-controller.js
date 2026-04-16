import { User } from '../models/user-model.js';


export async function loginPageController(req, res, next) {
    res.render('login.html', {
        title: 'Inicia Sesión',
        values: {}
    });
};

export async function loginActionController(req, res, next) {

    if (
        !req.body.email ||
        req.body.email === '' ||
        !req.body.password ||
        req.body.password === ''
    ) {
        const errorMessage = 'El usuario y la contraseña son obligatorios';
        res.render('login.html', {
            title: 'Inicia Sesión',
            errorMessage,
            values: {
                email: req.body.email,
            }
        });
        return;
    }

    const user = await User.findOne({ email: req.body.email })
        .select('+password');

    if (
        !user ||
        !(await user.comparePassword(req.body.password))
    ) {
        const errorMessage = 'Credenciales invalidas';
        res.render('login.html', {
            title: 'Inicia Sesión',
            errorMessage,
            values: {
                email: req.body.email,
            }
        });
        return;
    }

    // Tenemos usuario, y su pw es correcto
    req.session.userId = user.id;

    res.redirect('/');

}