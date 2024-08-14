import React from 'react';
import PropTypes from 'prop-types';
import { FaPhoneAlt } from 'react-icons/fa'

export default function Card({ name, phone, onClick, level }) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
            <h5 className="text-lg font-semibold mb-2 text-left">{name}</h5>
            <div className="flex items-center text-sm text-gray-700 mb-3">
                <FaPhoneAlt className="mr-1 text-blue-500" />
                <p>{phone}</p>
            </div>
            <div className="flex items-center">
                <p className="text-sm font-medium text-gray-600 mr-2">간호등급</p>
                <span className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
             {level}</span>
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    level: PropTypes.string.isRequired
};