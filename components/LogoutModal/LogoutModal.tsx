'use client';

type LogoutModalProps = {
    onClose: () => void;
    onConfirm: () => void;
};

export default function LogoutModal({
    onClose,
    onConfirm,
}: LogoutModalProps) {
    return (
        <div>
            <div>
                <h2>Are you sure?</h2>

                <p>We will miss you!</p>

                <button type="button" onClick={onConfirm}>
                    Log out
                </button>

                <button
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}