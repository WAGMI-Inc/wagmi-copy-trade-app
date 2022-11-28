import CoinAnimate from '../../components/CoinAnimate';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useUser } from '../../store/hooks';
import validator from 'validator';

const useStyles = makeStyles(theme => ({
    root: {
        background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText
    },
    rightSection: {
        background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText
    }
}));

function LoginPage() {
    const classes = useStyles();
    const history = useHistory();
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();

    function isFormValid() {
        return username.length > 0 && validator.isEmail(username) && password.length > 7;
    }

    const handleSubmit = async (ev) => {
        const result = await login({ username: username, password: password });
        if (result)
            history.go(0);
    }

    const keyPress = (e) => {
        if (!isFormValid())
            return;

        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    return (
        <div
            className={clsx(
                classes.root,
                'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24 min-h-screen'
            )}
        >
            <CoinAnimate animation="transition.expandIn">
                <div className="flex w-full max-w-400 md:max-w-lg rounded-6 sm:rounded-12 shadow-2xl overflow-hidden">
                    <Card
                        className='flex flex-col max-w-sm items-center justify-center w-full md:w-2/5'
                        square
                        elevation={0}
                    >
                        <div className="flex flex-col items-center justify-center w-full py-48 px-12 max-w-216">
                            <CoinAnimate delay={300}>
                                <img className="logo-icon mb-16" src="assets/images/new_logo.png" alt="logo" width="150" />
                            </CoinAnimate>

                            <TextField
                                label="Email"
                                autoFocus
                                type="text"
                                value={username}
                                inputProps={{
                                    autoComplete: 'new-password',
                                    form: {
                                        autoComplete: 'off',
                                    }
                                }}
                                onChange={e => { setUsername(e.target.value); }}
                                variant="outlined"
                                fullWidth
                                onKeyDown={keyPress}
                                style={{ marginBottom: "1rem" }}
                            />
                            {username !== "" && !validator.isEmail(username) ?
                                <p className='text-red-700 mb-12 -mt-9'>Enter the valid email address.</p>
                                : null
                            }
                            <TextField
                                label="Password"
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                inputProps={{
                                    autoComplete: 'new-password',
                                    form: {
                                        autoComplete: 'off',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {!showPass ?
                                                <VisibilityOffIcon style={{ color: 'grey' }} className='cursor-pointer' onClick={() => setShowPass(true)}></VisibilityOffIcon> :
                                                <VisibilityIcon style={{ color: 'grey' }} className='cursor-pointer' onClick={() => setShowPass(false)}></VisibilityIcon>
                                            }
                                        </InputAdornment>
                                    )
                                }}
                                onChange={e => { setPassword(e.target.value); }}
                                variant="outlined"
                                fullWidth
                                onKeyDown={keyPress}
                                style={{ marginBottom: "1.5rem" }}
                            />
                            {password !== "" && password.length < 8 ?
                                <p className='text-red-700 mb-12 -mt-14'>Password must be at least 8 characters.</p>
                                : null
                            }

                            <button
                                className="w-full mx-auto rounded text-white bg-blue-500 py-5"
                                disabled={!isFormValid()}
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </button>

                            <a onClick={() => history.push('/signup')} className='mt-8 cursor-pointer'>Don't you have an account?</a>
                        </div>
                    </Card>

                    <div
                        className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center px-64 py-40')}
                    >
                        <div className="max-w-320">
                            <CoinAnimate animation="transition.slideUpIn" delay={400}>
                                <p className="font-600 leading-tight text-32">
                                    WAGMI
                                </p>
                            </CoinAnimate>

                            <CoinAnimate delay={500}>
                                <p className="mt-32 text-10">Welcome to Wagmi Copy Trade App</p>
                            </CoinAnimate>
                        </div>
                    </div>
                </div>
            </CoinAnimate>
        </div>
    );
}

export default LoginPage;
