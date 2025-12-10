import React from 'react';
import { Switch } from '@headlessui/react';

export default function ToggleSwitch({ enabled, setEnabled, label }) {
    return (
        <Switch.Group>
            <div className="flex items-center justify-between">
                {label && <Switch.Label className="mr-4 text-sm font-medium text-gray-700">{label}</Switch.Label>}
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-brand-primary' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
}
