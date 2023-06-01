import { useState } from 'react'
import Button from './Button'
import { addContact } from '../redux/slice/contactSlice'
import { useAppDispatch } from '../redux/hooks'
import toast from 'react-hot-toast';
import { nanoid } from '@reduxjs/toolkit';
const notify = () => toast.success('Contact saved');
const warn = () => toast.error('Enter all fields');

const CreateContact = ({ setBtnStatus }: { setBtnStatus: React.Dispatch<React.SetStateAction<boolean>> }) => {
    // useState, dispatch to store all things we need
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [status, setStatus] = useState(false)
    const dispatch = useAppDispatch()

    // handle submit
    function handleSubmit() {
        if (!firstName || !lastName) {
            warn()
            return
        }
        const contact: IContactState = { firstName, lastName, status, id: nanoid(3) }
        dispatch(addContact(contact))
        notify()
        setBtnStatus(pre => !pre)
    }
    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:min-w-[400px] md:min-h-[200px]'>
            <div>
                <div className='flex px-2 justify-between items-center bg-gray-200 border border-gray-100 border-b-0 rounded-t'>
                    <h2 className='text-xl text-gray-700'>Create Contact</h2>
                    <Button click={() => setBtnStatus(pre => !pre)}>Close</Button>
                </div>
                <div className=''>
                    <form className='bg-gray-200 text-gray-700 border border-gray-100 border-t-0 rounded-b pb-2'>
                        <div className='flex items-center gap-2 justify-between p-2'>
                            <label>First Name:</label>
                            <input className='border-2 outline-none p-1 rounded' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className='flex items-center gap-2 justify-between p-2'>
                            <label>Last Name:</label>
                            <input className='border-2 outline-none p-1 rounded' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>

                        <div className='flex gap-2 pl-2'>
                            <h3>Status:</h3>
                            <div>
                                <div>
                                    <input className='mr-2' type="radio" name="drone" value="true" onChange={() => setStatus(true)} />
                                    <label htmlFor="">Active</label>
                                </div>
                                <div>
                                    <input className='mr-2' type="radio" name="drone" value="false" defaultChecked onChange={() => setStatus(false)} />
                                    <label htmlFor="">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Button click={handleSubmit}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateContact