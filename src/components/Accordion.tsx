import React, { useState } from 'react';

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    question,
    answer,
    isOpen,
    onClick,
    index
}) => {
    return (
        <div className={`mb-4 rounded-lg overflow-hidden transition-shadow duration-300 ${isOpen ? 'shadow-lg' : 'shadow'}`}>
            <button
                className={`flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none ${isOpen ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <h3 className={`text-lg font-semibold ${isOpen ? 'text-white' : 'text-gray-800'}`}>
                    {question}
                </h3>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? 'bg-white bg-opacity-20' : 'bg-blue-100'}`}>
                    <svg
                        className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-blue-600'} transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-300`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px]' : 'max-h-0'}`}
            >
                <div className="p-6 bg-white border-t border-gray-100 text-gray-600 prose">
                    {answer}
                </div>
            </div>
        </div>
    );
};

interface AccordionProps {
    items: {
        question: string;
        answer: string;
    }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => toggleItem(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
