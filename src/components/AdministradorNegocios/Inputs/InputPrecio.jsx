import { Input } from "@nextui-org/react";

export default function InputPrecio() {
  return (
    
        <Input
          label="Price"
          placeholder="0.00"
          variant="bordered"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="currency"
                name="currency"
              >
                <option>CUP</option>
                <option>MLC</option>
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
          }
          type="number"
        />
        
       
  );
}
