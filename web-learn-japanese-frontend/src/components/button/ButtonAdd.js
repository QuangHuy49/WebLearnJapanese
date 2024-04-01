import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ButtonAdd = () => {
    return (
        <button className="w-[40px] h-[40px] bg-custom-color-blue rounded-lg font-semibold hover:scale-110 transition-all hover:rounded-md">
            <FontAwesomeIcon icon={faPlus} className="text-white" />
        </button>
    );
}

export default ButtonAdd;