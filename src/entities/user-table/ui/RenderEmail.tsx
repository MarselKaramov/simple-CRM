export const renderEmail = function (email: string) {
    return (
        <a
            href={'mailto:' + email}
            style={{ fontSize: '12px' }}
        >
            {email}
        </a>
    );
};
