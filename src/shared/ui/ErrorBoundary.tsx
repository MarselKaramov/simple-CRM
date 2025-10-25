// components/ErrorBoundary.tsx
import React from 'react';
import { Alert, Button } from 'antd';

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Component error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert
                    message="Ошибка загрузки компонента"
                    description={
                        <div>
                            <p>Не удалось загрузить компонент. Попробуйте перезагрузить страницу.</p>
                            <Button onClick={() => window.location.reload()}>
                                Перезагрузить страницу
                            </Button>
                        </div>
                    }
                    type="error"
                    showIcon
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;