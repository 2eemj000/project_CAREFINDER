import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ name, phone, onClick, level }) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
            <h5 className="text-lg font-semibold mb-2">{name}</h5>
            <p className="text-sm text-gray-700">{phone}</p>
            <div className="px-2 pt-2 pb-4 flex flex-wrap">
                {level.map((lvl, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                    >
                        {lvl}
                    </span>
                ))}
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    level: PropTypes.arrayOf(PropTypes.string)
};