import React from "react";
import { Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
// Take context here and update state..
import DataProvider, {DataContext, useData} from "@src/containers/home/DataProvider";

const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      name,
      label,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      error,
      touched,
      inputProps = {},
      children,
      helperText,
      wrapperProps = {},
    },
    ref
  ) => {

    const { state, setState } = useData();
    //console.log("STATE in FormInput", state);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        requisitionDetails: {
          ...prevState.requisitionDetails,
          [e.target.name]: e.target.value,
        },
      }));
      console.log("value in input", e.target.value);
    };
    return (
      <FormWrapper
        isInvalid={Boolean(error && touched)}
        wrapperProps={wrapperProps}
        helperText={helperText}
        label={label}
        touched={touched}
        error={error as string}
      >
        <Input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          // styles
          width="100%"
          maxHeight="none !important"
          minW="272px"
          height="45px"
          fontSize="0.875rem"
          fontWeight="500"
          px="20px"
          border="1px solid #c0bcd7"
          bg="inputBg"
          borderRadius="10px"
          focusBorderColor="primary"
          errorBorderColor="errorRed"
          _placeholder={{
            color: "text.placeholder",
          }}
          ref={ref}
          {...inputProps}
        />
        {children}
      </FormWrapper>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
