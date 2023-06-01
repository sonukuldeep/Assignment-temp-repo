import { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { useAppSelector } from '../redux/hooks'
import toast from 'react-hot-toast';
import Button from './Button'
import CreateContact from './CreateContact'
import { useAppDispatch } from '../redux/hooks'
import { deleteContact } from '../redux/slice/contactSlice'
import EditContact from './EditContact'

// messeage for hot toast nootification
const notify = () => toast('Contact purged', { icon: '🗑' });

const Contacts = () => {
    // setting btns triggers getting contacts from store etc
    const [isBtnActive, setIsBtnActive] = useState(false)
    const [editTrigger, setEditTrrigger] = useState(false)
    const [editContact, setEditContact] = useState<IContactState>()
    const contactDetails = useAppSelector(state => state.contact)
    // this is a custom hook. Helps for better type casting
    const dispatch = useAppDispatch()

    // tiny function that invokes setEdit contact and passes the contract
    // triggers edit btn
    function handleEdit(contact: IContactState) {
        setEditContact(contact)
        setEditTrrigger(pre => !pre)
    }

    // handle edit calls dispatch to relete the cotract
    function handleContactDelete(contact: IContactState) {
        dispatch(deleteContact(contact.id))
        notify()
    }

    // if edit create btn is clicked createContact is rendered(see at the end of this if) else
    // we check again if edit btn is clicked we render edit component else create component  is rendered
    if (!isBtnActive) {
        if (editTrigger && editContact) {
            return (
                <EditContact setBtnStatus={setEditTrrigger} contact={editContact} />
            )
        } else
            return (
                // create contact card
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded md:min-w-[400px] md:min-h-[200px] pb-2'>
                    <div className='flex flex-col items-center'>
                        <Button click={() => setIsBtnActive(pre => !pre)}>Create Contact</Button>
                        {/* display message if cards dont exist else display all cards if the */}
                        {contactDetails.length === 0 ? (
                            <div className='flex gap-2 items-center border-2 p-2 rounded border-gray-500'>
                                <MdCancel size='3em' />
                                <p>No Contact Found <br />Please add contact from <br /> Create Contact Button</p>
                            </div>
                        ) : (
                            // display first name last name edit and delete button
                            <div className="flex items-center justify-center flex-wrap max-h-[70vh] overflow-auto">
                                {contactDetails.map(contact =>
                                    <div className='bg-gray-300 border border-gray-100 rounded-lg p-2 m-2 min-w-[200px] shadow-xl' key={contact.id}>
                                        <p className='text-lg font-light capitalize text-center'>First name: {contact.firstName}</p>
                                        <p className='text-lg font-light capitalize text-center'>Last name : {contact.lastName}</p>
                                        <p className='text-lg font-light text-center'>Status: {`${contact.status}`}</p>
                                        {/* different button as per need */}
                                        <div className='flex flex-col items-center'>
                                            <Button btn='secondary' click={() => handleEdit(contact)}>Edit</Button>
                                            <Button btn='danger' click={() => handleContactDelete(contact)}>Delete</Button>
                                        </div>
                                    </div>)}
                            </div>
                        )
                        }
                    </div>
                </div>
            )
    } else {
        return (
            <CreateContact setBtnStatus={setIsBtnActive} />
        )
    }
}

export default Contacts