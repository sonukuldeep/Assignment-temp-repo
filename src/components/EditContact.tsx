import { useState } from 'react'
import Button from './Button'
import { updateContact } from '../redux/slice/contactSlice'
import { useAppDispatch } from '../redux/hooks'
import toast from 'react-hot-toast';

// warning messages and notification messages
const warn = () => toast.error('Enter all fields');
const notifyEditSaved = () => toast.success('Edited contact saved');


const EditContact = ({ setBtnStatus, contact }: { setBtnStatus: React.Dispatch<React.SetStateAction<boolean>>, contact: IContactState }) => {
    // mostly its the same the same logic as create contact btn but there are few additions
    // as a results i created two components to not over complicate stuff make make use of a 
    // single component with several tweaks here and there 
    // setting up states dispatch
    const [firstName, setFirstName] = useState(contact.firstName)
    const [lastName, setLastName] = useState(contact.lastName)
    const [status, setStatus] = useState(contact.status)
    const dispatch = useAppDispatch()

    // basic validation and calling dispatch function to update contact
    function handleSubmit() {
        if (!firstName || !lastName) {
            warn()
            return
        }
        const editedContact: IContactState = { firstName, lastName, status, id: contact.id }
        dispatch(updateContact(editedContact))
        notifyEditSaved()
        setBtnStatus(pre => !pre)
    }
    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:min-w-[400px] md:min-h-[200px]'>
            <div>
                <div className='flex px-2 justify-between items-center bg-gray-200 border border-gray-100 border-b-0 rounded-t'>
                    <h2 className='text-xl text-gray-700'>Edit Contact</h2>
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
                                    {/* using contact.status instead of status to prevent re-rendering everytime staus changes */}
                                    {contact.status ? <input className='mr-2' type="radio" name="drone" value="true" defaultChecked onChange={() => setStatus(true)} /> :
                                        <input className='mr-2' type="radio" name="drone" value="true" onChange={() => setStatus(true)} />}
                                    <label htmlFor="">Active</label>
                                </div>
                                <div>
                                    {contact.status ? <input className='mr-2' type="radio" name="drone" value="false" onChange={() => setStatus(false)} /> :
                                        <input className='mr-2' type="radio" name="drone" value="false" defaultChecked onChange={() => setStatus(false)} />}
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

export default EditContact