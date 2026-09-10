"use client";

import * as Select from "@radix-ui/react-select";

const services = [
  "Website Design",
  "Full-Stack Development",
  "E-Commerce Store",
  "SEO & Performance",
  "Branding & Logo",
  "Startup Package",
  "Other / Not Sure",
];

interface ServiceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ServiceSelect({ value, onValueChange }: ServiceSelectProps) {
  return (
    <Select.Root
      name="service"
      value={value}
      onValueChange={onValueChange}
      required
    >
      <Select.Trigger id="service" className="contact-select__trigger">
        <Select.Value placeholder="Select a service" />
        <Select.Icon className="contact-select__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="contact-select__content"
          position="popper"
          sideOffset={8}
          collisionPadding={16}
        >
          <Select.ScrollUpButton className="contact-select__scroll-button" aria-label="Scroll services up">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 12.5 5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.ScrollUpButton>
          <Select.Viewport className="contact-select__viewport">
            {services.map((service) => (
              <Select.Item key={service} value={service} className="contact-select__item">
                <Select.ItemText>{service}</Select.ItemText>
                <Select.ItemIndicator className="contact-select__indicator" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="m4.5 10.5 3.25 3.25L15.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="contact-select__scroll-button" aria-label="Scroll services down">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
