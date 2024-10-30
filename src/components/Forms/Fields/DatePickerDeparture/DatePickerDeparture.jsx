import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import './DatePickerDeparture.scss';

export default function DatePickerDeparture({date}) {
	const [value, setValue] = React.useState(dayjs(date).format("YYYY-MM-DD"));

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Stack spacing={3}>
				<DatePicker
					className="search-form-field"
					views={['day']}
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
						// //console.log("dateTo:",newValue.format("YYYY-MM-DD"));
						localStorage.setItem("dateTo",newValue.format("YYYY-MM-DD"));
					}}
					inputFormat="DD/MM/YYYY"
					renderInput={(params) => <TextField {...params} helperText={null} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
}