import './Button.css'

export default function Button({tittle, action}: { tittle: string, action: (value: boolean) => void }) {
    return (
        <button id='button' value={tittle}
                onClick={(e) => {
                    e.preventDefault();
                    action(true);
                }}>
            {tittle}
        </button>
    )
}