import React from 'react';

// material-ui
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';

// project imports
import { UploadAvatar, Upload, UploadBox } from '../../../../src/components/upload';
import ClaimTable from './ClaimTable';

// third-party
import { useIntl } from 'react-intl';

const ClaimApplication = () => {
    const intl = useIntl();
    const claim_types = [
        'computer-expenses',
        'maintenance-expenses',
    ];
    const [preview, setPreview] = React.useState(false);

    const [files, setFiles] = React.useState([]);

    const handleDropMultiFile = React.useCallback(
      (acceptedFiles) => {
        setFiles([
          ...files,
          ...acceptedFiles.map((newFile) =>
            Object.assign(newFile, {
              preview: URL.createObjectURL(newFile),
            })
          ),
        ]);
      },
      [files]
    );
  
    const handleRemoveFile = (inputFile) => {
      const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
      setFiles(filesFiltered);
    };
  
    const handleRemoveAllFiles = () => {
      setFiles([]);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="claim-type">{intl.formatMessage({id: "claim-type"})}</InputLabel>
                        <Select
                            value={claim_types[0]}
                            labelId="claim-type"
                            id="claim-type"
                            name="claim-type"
                            label={intl.formatMessage({id: "claim-type"})}
                        >
                            {claim_types.map((claim_type, index) => (
                                <MenuItem key={index} value={claim_type}>{intl.formatMessage({id: claim_type})}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField id="amount" name="amount" type="number" label={intl.formatMessage({id: 'amount'})} fullWidth />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField id="description" name="description" label={intl.formatMessage({id: 'description'})} fullWidth />
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">
                        {intl.formatMessage({id: 'add'})}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <ClaimTable />
                </Grid>
                <Grid item xs={12}>
                    <Upload
                        multiple
                        thumbnail={preview}
                        files={files}
                        onDrop={handleDropMultiFile}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        onUpload={() => console.log('ON UPLOAD')}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">
                        {intl.formatMessage({id: 'submit'})}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ClaimApplication;
