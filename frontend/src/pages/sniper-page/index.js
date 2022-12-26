import React from 'react';
import { useUser } from 'store/hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify'

function SniperPage() {
    const { userWallet, getUserAutoSchedule, setAutoSchedule, autoScheduleAmount, removeAutoSchedule } = useUser();
    const [amount, setAmount] = useState(0);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const init = async () => {
            await getUserAutoSchedule();
        }
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const save = async () => {
        const result = await setAutoSchedule(amount);
        if (result)
            toast.success('Succssfully scheduled!');
    }

    const remove = async () => {
        const result = await removeAutoSchedule();
        if (result)
            toast.success('Succssfully removed!');
    }

    const editAutoSchedule = async () => {
        if (amount) {
            const result = await setAutoSchedule(amount);
            if (result) {
                toast.success('Succssfully edited!');
                setIsEdit(false);
            }
        }
    }

    return (
        <div className='secondary-background rounded-8 lg:py-16 lg:px-24 sm:p-12 p-6'>
            <div className='w-full flex justify-center'>
                <p className='text-green-500 mb-7 text-14'>Token Sniper</p>
            </div>
            {!userWallet.balance ?
                <>
                    <div className='flex flex-col items-center'>
                        <p>Please deposit ETH to start!</p>
                        <a href="/wallet">To deposit ETH click here!</a>
                    </div>
                    <div className='border-b-1 w-full border-b-black border-opacity-10 mt-4 mb-6'></div>
                </>
                : null
            }
            {
                !autoScheduleAmount ?
                    <div>
                        <p>ETH Amount to buy new token:</p>
                        <input className='mt-2 rounded-4 px-6 py-4 outline-none focus:outline-none bg-grey-900 w-full'
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        ></input>
                        <div className='flex w-full justify-center'>
                            <button className='button-back mt-6 text-gray-900 rounded-full py-3 px-12 font-medium'
                                onClick={() => save()}
                            >Schedule Auto</button>
                        </div>
                    </div> :
                    <>
                        {!isEdit ?
                            <div>
                                <p>Buy new listing tokens with {autoScheduleAmount}ETH</p>
                                <div className='flex w-full justify-end items-center mt-4'>
                                    <button className='bg-green-400 rounded-full px-6 py-4'
                                        onClick={() => setIsEdit(true)}
                                    >Edit</button>
                                    <button className='bg-red-400 rounded-full px-6 py-4 ml-6'
                                        onClick={() => remove()}
                                    >Remove</button>
                                </div>
                            </div> :
                            <>
                                <p>ETH Amount to buy new token:</p>
                                <input className='mt-2 rounded-4 px-6 py-4 outline-none focus:outline-none bg-grey-900 w-full'
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                ></input>
                                <div className='flex w-full justify-end items-center mt-4'>
                                    <button className='bg-green-400 rounded-full px-6 py-4'
                                        onClick={() => editAutoSchedule()}
                                    >Edit</button>
                                    <button className='bg-red-400 rounded-full px-6 py-4 ml-6'
                                        onClick={() => setIsEdit(false)}
                                    >Cancel</button>
                                </div>
                            </>
                        }
                    </>
            }

        </div >
    );
}

export default React.memo(SniperPage);
