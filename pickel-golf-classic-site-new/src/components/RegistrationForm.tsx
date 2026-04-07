import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const RegistrationForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [friday, setFriday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [shirtSize, setShirtSize] = useState('md');

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
                headers: { 'Content-Type': 'application/json' },
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
        <div className="bg-white border border-cream-dark p-8">
            <p className="overline mb-1">Tournament Registration</p>
            <h2 className="font-display font-semibold text-2xl text-text-dark mb-2">Enter Your Details</h2>
            <div className="w-10 h-px bg-secondary-color my-4" />

            <p className="font-display text-xl text-text-mid mb-4">
                Fill out the form below to register. If your account is already registered,
                you can update your information by resubmitting.
            </p>
            <p className="font-display text-xl text-text-mid mb-8">
                In addition to the tournament rounds on Saturday and Sunday, there will be an optional round on
                Friday afternoon (August 28th, around 3–4 PM) and Monday (August 31st). These rounds are not
                included in the tournament fees.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="first_name" className="overline block mb-2">First Name</label>
                    <input type="text" id="first_name" name="first_name" required value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="form-input-underline" />
                </div>

                <div>
                    <label htmlFor="last_name" className="overline block mb-2">Last Name</label>
                    <input type="text" id="last_name" name="last_name" required value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="form-input-underline" />
                </div>

                <div>
                    <p className="overline mb-3">Optional Rounds</p>
                    <div className="flex items-center gap-6">
                        <label className="inline-flex items-center cursor-pointer gap-2">
                            <input type="checkbox" id="friday" name="friday" checked={friday}
                                onChange={e => setFriday(e.target.checked)}
                                className="w-4 h-4 accent-primary-color" />
                            <span className="font-display text-text-dark">Friday Afternoon</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer gap-2">
                            <input type="checkbox" id="monday" name="monday" checked={monday}
                                onChange={e => setMonday(e.target.checked)}
                                className="w-4 h-4 accent-primary-color" />
                            <span className="font-display text-text-dark">Monday</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="shirt" className="overline block mb-2">Shirt Size</label>
                    <select id="shirt" name="shirt" value={shirtSize}
                        onChange={e => setShirtSize(e.target.value)}
                        className="form-input-underline cursor-pointer">
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">X-Large</option>
                    </select>
                </div>

                <div className="pt-4 text-center">
                    <input type="submit" value="Submit Registration" className="btn-gold cursor-pointer" />
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
