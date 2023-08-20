import Input, { InputProps } from '@mui/material/Input';
import { countriesInfo, defaultCountriesInfo, CountryInfo } from './PhoneNumber';
import { useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// SELECT
interface PrefixSelectProps {
  isDropdownOpen: boolean,
  dropdownHandler: () => void;
  selectedCountry: CountryInfo,
  selectChangeHandler: (event: SelectChangeEvent) => void
}
const PrefixSelect = function (props: PrefixSelectProps) {
  const { isDropdownOpen, dropdownHandler, selectedCountry, selectChangeHandler } = props;

  const formattedDropdownValues = () => {
    return countriesInfo.map((currentCountry) => {
      return (
        <MenuItem key={currentCountry.countryName} value={currentCountry.countryIdentifier} >
          {currentCountry.countryName}
        </MenuItem>
      )
    });
  }

  return (
    <Select
      onChange={selectChangeHandler}
      onClick={isDropdownOpen ? dropdownHandler : undefined}
      open={isDropdownOpen}
      className='phone_prefix_select'
      defaultValue={selectedCountry.countryIdentifier.toString()} >
      {formattedDropdownValues()}
    </Select>
  )
}

// LABEL
interface PrefixLabelProps {
  prefixValue: string;
  dropdownHandler: () => void;
  focus: boolean;
  hover: boolean;
}
const PrefixLabel = function (props: PrefixLabelProps) {
  const { prefixValue, dropdownHandler, focus, hover } = props;

  const theme = useTheme();
  const labelStyle = {
    backgroundColor: `${theme.palette.grey[300]}`,
    borderTop: `${(focus || hover) ? '2px' : '1px'} solid 
      ${focus ? theme.palette.primary.main : hover ? theme.palette.grey[700] : theme.palette.grey[500]}`,
    borderLeft: `${(focus || hover) ? '2px' : '1px'} solid 
      ${focus ? theme.palette.primary.main : hover ? theme.palette.grey[700] : theme.palette.grey[500]}`,
    borderBottom: `${(focus || hover) ? '2px' : '1px'} solid 
      ${focus ? theme.palette.primary.main : hover ? theme.palette.grey[700] : theme.palette.grey[500]}`,
    borderTopLeftRadius: `4px`,
    borderBottomLeftRadius: `4px`,
  };

  return <Box component="div"
    onClick={dropdownHandler}
    style={labelStyle}
    className='phone_prefix_label'>
    <Typography>
      {prefixValue}
    </Typography>
  </Box>
}

// INPUT
interface NumberInputProps extends InputProps {
  validator: RegExp;
  labelFocusHandler: (value: boolean) => void;
  defaultData?: string;
  placeholder?: string;
  inputHoveredHandler: (value: boolean) => void;
}
const NumberInput = function (props: NumberInputProps) {
  const { onFocus, onBlur, labelFocusHandler, validator, defaultData, placeholder, inputHoveredHandler } = props;

  const customFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    labelFocusHandler(true);
    if (!onFocus) return;
    onFocus(event);
  };
  const custumBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    labelFocusHandler(false);
    if (!onBlur) return;
    onBlur(event);
  };
  return <Input
    type="tel"
    className='phone_number_input'
    onFocus={customFocus}
    onBlur={custumBlur}
    placeholder={placeholder}
    defaultValue={defaultData}
    onMouseEnter={() => { inputHoveredHandler(true) }}
    onMouseLeave={() => { inputHoveredHandler(false) }} />
}

// MAIN
interface PhoneInputProps extends InputProps {
  data?: string;
  country?: number | string;
  isMobile?: boolean;
}
export default function PhoneNumberInput(props: PhoneInputProps) {
  const { data, country, isMobile } = props;

  const initSelectedCountry: CountryInfo = country ?
    (typeof country == "number" ?
      countriesInfo[countriesInfo.map(c => c.countryIdentifier).indexOf(country)] :
      countriesInfo[countriesInfo.map(c => c.countryName).indexOf(country)]) :
    defaultCountriesInfo;
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(initSelectedCountry);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setHover] = useState(false);

  const selectChangeHandler = (event: SelectChangeEvent) => {
    setSelectedCountry(countriesInfo[countriesInfo.map(c => c.countryIdentifier).indexOf(Number.parseInt(event.target.value))]);
  };
  const dropdownHandler = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const labelFocusHandler = (value: boolean) => {
    setIsFocus(value);
  };
  const inputHoveredHandler = (value: boolean) => {
    setHover(value);
  };

  const sanitizeData: string | undefined = data ? data.replace('+' + selectedCountry.countryIdentifier.toString(), '').replace('00' + selectedCountry.countryIdentifier.toString(), '') : undefined;

  return (
    <Box component="div" className='phone_input_wrapper'>
      <NumberInput
        validator={selectedCountry.validator}
        labelFocusHandler={labelFocusHandler}
        defaultData={sanitizeData}
        placeholder={selectedCountry?.placeholder}
        inputHoveredHandler={inputHoveredHandler} />
      <PrefixSelect
        isDropdownOpen={isDropdownOpen}
        dropdownHandler={dropdownHandler}
        selectedCountry={selectedCountry}
        selectChangeHandler={selectChangeHandler} />
      <PrefixLabel
        prefixValue={'+' + selectedCountry.countryIdentifier}
        dropdownHandler={dropdownHandler}
        focus={isFocus}
        hover={isHover} />
    </Box>
  )
}