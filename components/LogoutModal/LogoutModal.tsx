'use client';

type LogoutModalProps = {
    onClose: () => void;
};

export default function LogoutModal({
    onClose,
}: LogoutModalProps) {
    return (
        <div>
            <div>
                <h2>Are you sure?</h2>

                <p>We will miss you!</p>

                <button type="button">
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