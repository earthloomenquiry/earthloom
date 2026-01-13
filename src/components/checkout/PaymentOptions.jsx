import { useState } from 'react';
import { FaCreditCard, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si';
import { PAYMENT_METHODS } from '../../utils/constants';

const PaymentOptions = ({ selectedMethod, onMethodChange }) => {
    const getIcon = (iconName) => {
        const icons = {
            card: <FaCreditCard size={24} />,
            upi: <SiGooglepay size={24} />,
            bank: <FaUniversity size={24} />,
            cash: <FaMoneyBillWave size={24} />,
        };
        return icons[iconName] || <FaCreditCard size={24} />;
    };

    return (
        <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
                <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === method.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => onMethodChange(e.target.value)}
                        className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                        <div className={`mr-4 ${selectedMethod === method.id ? 'text-primary-600' : 'text-gray-600'}`}>
                            {getIcon(method.icon)}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id
                            ? 'border-primary-600'
                            : 'border-gray-300'
                        }`}>
                        {selectedMethod === method.id && (
                            <div className="w-3 h-3 rounded-full bg-primary-600" />
                        )}
                    </div>
                </label>
            ))}

            {/* Payment Method Details */}
            {selectedMethod === 'credit-card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="input-field"
                        maxLength="16"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="input-field"
                            maxLength="5"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            className="input-field"
                            maxLength="3"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="input-field"
                    />
                </div>
            )}

            {selectedMethod === 'upi' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <input
                        type="text"
                        placeholder="Enter UPI ID (e.g., yourname@upi)"
                        className="input-field"
                    />
                    <div className="flex items-center justify-center space-x-4 mt-4">
                        <SiGooglepay size={32} className="text-gray-600" />
                        <SiPhonepe size={32} className="text-gray-600" />
                        <SiPaytm size={32} className="text-gray-600" />
                    </div>
                </div>
            )}

            {selectedMethod === 'netbanking' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <select className="input-field">
                        <option value="">Select Your Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                </div>
            )}

            {selectedMethod === 'cod' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Pay with cash when your order is delivered. Please keep exact change handy.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;
