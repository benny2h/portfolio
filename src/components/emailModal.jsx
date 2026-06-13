import { useEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { FaUser, FaLaptopCode } from 'react-icons/fa';

const options = [
    {
        label: 'Privat',
        desc: 'Allgemeine Anfragen & Kontakt',
        email: 'herdtbenny@gmail.com',
        icon: <FaUser />,
    },
    {
        label: 'Website Design',
        desc: 'Anfragen zu Webdesign-Projekten',
        email: 'websbybenny@gmail.com',
        icon: <FaLaptopCode />,
    },
];

function EmailModal({ onClose }) {
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0e1117] p-6 font-syne shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Schließen"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                    <HiOutlineX className="text-lg" />
                </button>

                <h3 className="m-0 mb-1.5 text-lg font-bold text-white sm:text-xl">Worum geht's?</h3>
                <p className="m-0 mb-6 font-inter text-sm text-neutral-500">Wähle die passende Adresse für deine Nachricht.</p>

                <div className="flex flex-col gap-3">
                    {options.map((option) => (
                        <a
                            key={option.email}
                            href={`mailto:${option.email}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:bg-cyan-500/[0.06]"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-base text-accent">
                                {option.icon}
                            </span>
                            <span className="flex flex-col">
                                <span className="text-sm font-bold text-white">{option.label}</span>
                                <span className="font-inter text-xs text-neutral-500">{option.desc}</span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmailModal;
