import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import { useUser } from '../contexts/UserContext';

const RegistrationForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [friday, setFriday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [shirtSize, setShirtSize] = useState('sm');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    const navigate = useNavigate();
    const { user } = useUser();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!user) {
            console.error('User is not logged in');
            return;
        }

        const data = {
            firstName,
            lastName,
            friday,
            monday,
            shirt: shirtSize,
            clerkId: user.id,
            registered: true
        };

        try {
            const response = await fetch(API_BASE_URL + '/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                navigate('/payment');
            } else {
                console.error('Error updating user:', result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container>
            <div>
                <h1 className="font-display text-2xl md:text-3xl text-green-900 text-center font-bold mb-2">
                    Registration
                </h1>
                <div className="gold-divider mb-5"></div>

                <p className="font-body text-gray-600 mb-4">
                    Fill out the form below to register. If your account is already registered, you can update your
                    information by filling it out again and resubmitting.
                </p>
                <p className="font-body text-gray-600 mb-6">
                    In addition to the tournament rounds on Saturday and Sunday, there will be an optional round on
                    Friday afternoon (August 28th, around 3-4 PM) and Monday (August 31st). Please indicate below if
                    you would be interested in playing those days. These rounds will not be included in the tournament fees.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label htmlFor="first_name" className="mb-1.5 font-body font-semibold text-green-900 text-sm">First Name</label>
                        <input type="text" id="first_name" name="first_name" required value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="p-2.5 border border-gray-300 rounded font-body focus:outline-none focus:ring-2 focus:ring-green-800/30 focus:border-green-800 transition-colors" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="last_name" className="mb-1.5 font-body font-semibold text-green-900 text-sm">Last Name</label>
                        <input type="text" id="last_name" name="last_name" required value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="p-2.5 border border-gray-300 rounded font-body focus:outline-none focus:ring-2 focus:ring-green-800/30 focus:border-green-800 transition-colors" />
                    </div>

                    <div>
                        <p className="font-body font-semibold text-green-900 text-sm mb-2">Interest in additional rounds</p>
                        <div className="flex items-center gap-5">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="friday" name="friday" checked={friday}
                                    onChange={e => setFriday(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-green-800 rounded border-gray-300 focus:ring-green-800/30" />
                                <span className="ml-2 font-body text-gray-700">Friday</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="monday" name="monday" checked={monday}
                                    onChange={e => setMonday(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-green-800 rounded border-gray-300 focus:ring-green-800/30" />
                                <span className="ml-2 font-body text-gray-700">Monday</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="shirt" className="mb-1.5 font-body font-semibold text-green-900 text-sm">T-Shirt Size</label>
                        <select id="shirt" name="shirt" value={shirtSize}
                            onChange={e => setShirtSize(e.target.value)}
                            className="p-2.5 border border-gray-300 rounded font-body focus:outline-none focus:ring-2 focus:ring-green-800/30 focus:border-green-800 transition-colors bg-white">
                            <option value="sm">SM</option>
                            <option value="md">MD</option>
                            <option value="lg">LG</option>
                            <option value="xl">XL</option>
                        </select>
                    </div>

                    <div className="flex justify-center pt-2">
                        <input type="submit" value="Submit Registration" className="btn-secondary cursor-pointer" />
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default RegistrationForm;
