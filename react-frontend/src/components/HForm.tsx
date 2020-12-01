import React, { ReactNode } from "react";

export interface HFieldInfo {
    fieldName: string,
    fieldValue: (() => string),
    changeHandler: ((value: string) => void)
}

export abstract class HFormComponent<P, S extends {
    fields: Record<string, string>
}> extends React.Component<P, S> {
    managedField = (field: keyof S["fields"]): HFieldInfo => {
        return {
            fieldName: "" + field,
            fieldValue: () => this.state.fields[field],
            changeHandler: (value: string) => {
                this.setState(() => ({
                    fields: {
                        ...this.state.fields,
                        [field]: value
                    }
                }));
            }
        };
    }

    clearFields(): void
    {
        this.setState(() => ({
            fields: {
                ...Object.keys(this.state.fields).reduce((value, key) => ({ ...value, [key]: "" }), {})
            }
        }));
    }
}

export class HForm extends React.Component<{
    onSubmit: (() => void)
}> {
    handleSubmit = (event: React.FormEvent<HTMLFormElement>): boolean => {
        this.props.onSubmit();
        event.preventDefault();
        return false;
    }

    render(): ReactNode
    {
        return (
            <form onSubmit={ this.handleSubmit } method="POST">
                { this.props.children }
            </form>
        );
    }
}