import React from "react";

export class HClockDate extends React.Component<unknown, {
    currentDate: Date
}> {
    private timeoutID?: number;

    constructor(props: unknown)
    {
        super(props);

        this.state = {
            currentDate: new Date()
        };
    }

    updateDate = (): void => {
        this.setState(state => ({
            ...state,
            currentDate: new Date(),
        }));

        this.timeoutID = window.setTimeout(this.updateDate, 1000);
    }

    componentDidMount(): void
    {
        this.updateDate();
    }

    componentWillUnmount(): void
    {
        window.clearTimeout(this.timeoutID);
    }

    render(): JSX.Element
    {
        return (
            <span>
                { this.state.currentDate.getDate() }.{  ("0" + (this.state.currentDate.getMonth() + 1)).slice(-2) }.{ this.state.currentDate.getFullYear() }
            </span>
        );
    }
}

export class HClockTime extends React.Component<unknown, {
    currentTime: Date
}> {
    private timeoutID?: number;

    constructor(props: unknown)
    {
        super(props);

        this.state = {
            currentTime: new Date()
        };
    }

    updateDate = (): void => {
        this.setState(state => ({
            ...state,
            currentTime: new Date(),
        }));

        this.timeoutID = window.setTimeout(this.updateDate, 1000);
    }

    componentDidMount(): void
    {
        this.updateDate();
    }

    componentWillUnmount(): void
    {
        window.clearTimeout(this.timeoutID);
    }

    render(): JSX.Element
    {
        return (
            <span>
                { this.state.currentTime.getHours() }:{ ("0" + this.state.currentTime.getMinutes()).slice(-2) }
            </span>
        );
    }
}