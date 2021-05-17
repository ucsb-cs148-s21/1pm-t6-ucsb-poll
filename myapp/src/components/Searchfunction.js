import React, { FC, useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDatastore } from 'auth.provider';


export type onPollSelect = (question: question) => void;

type PollAutocomplete = {
  uid: string;

  text: string;

  initialValue?: string;

  placeholder?: string;

  onSelect: onPollSelect;

};


const LocationAutosuggest = Autosuggest as new () => Autosuggest<Country>;
19
20
export const LocationAutocomplete: FC<LocationAutocomplete> = ({
21
  uid,
22
  text,
23
  initialValue = '',
24
  placeholder = 'Enter country name',
25
  onSelect,
26
}) => {
27
  const store = useDatastore();
28
  const service = new CountryService(store);
29
30
  const [value, setValue] = useState(initialValue);
31
  const [suggestions, setSuggestions] = useState([] as Country[]);
32
33
  useEffect(() => {
34
    setValue(initialValue);
35
  }, [initialValue]);
36
37
  const onChange = useCallback(
38
    (_: ChangeEvent, { newValue }: { newValue: string }) => {
39
      setValue(newValue);
40
    },
41
    [setValue],
42
  );
43
44
  const selectSuggestion = useCallback(
45
    (country: Country) => {
46
      onSelect(country);
47
      return country.name;
48
    },
49
    [onSelect],
50
  );
51
52
  const clearSuggestions = useCallback(() => {
53
    setSuggestions([]);
54
  }, [setSuggestions]);
55
56
  const fetchSuggestions = useCallback(
57
    ({ value }: { value: string }) => {
58
      if (value.length > 1) {
59
        service.fetchCountries(value).then(setSuggestions).catch(console.error);
60
      }
61
    },
62
    [service],
63
  );
64
65
  const renderSuggestion = useCallback((country: Country) => {
66
    return (
67
      <div tw="flex items-center text-sm">
68
        <img src={country.flag} alt="" tw="w-6 rounded-sm mr-4 pointer-events-none" />
69
        <span>{country.name}</span>
70
      </div>
71
    );
72
  }, []);
73
74
  const inputProps = useMemo(() => ({ onChange, placeholder, value }), [onChange, placeholder, value]);
75
76
  return (
77
    <>
78
      <label tw="block mb-1" htmlFor={uid}>
79
        {text}
80
      </label>
81
      <LocationAutosuggest
82
        getSuggestionValue={selectSuggestion}
83
        inputProps={inputProps}
84
        multiSection={false}
85
        onSuggestionsClearRequested={clearSuggestions}
86
        onSuggestionsFetchRequested={fetchSuggestions}
87
        renderSuggestion={renderSuggestion}
88
        suggestions={suggestions}
89
      />
90
    </>
91
  );
92
};