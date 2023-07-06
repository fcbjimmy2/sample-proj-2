import React from 'react';
import dynamic from 'next/dynamic';

// third-party
import { useIntl } from 'react-intl';
import { Grid, Typography } from '@mui/material';

import { froalaEditorConfigWithoutMath } from '../../../../config';

// import FroalaEditorComponent from 'react-froala-wysiwyg';
const FroalaEditorComponent = dynamic(
    async () => {
        const values = await Promise.all([
            import("react-froala-wysiwyg")
        ]);
        return values[0];
    },
    {
        ssr: false
    }
);

const PrivacyPolicy = ({ data, handleEnModelChange, handleZhHantModelChange, handleZhHansModelChange }) => {
    const intl = useIntl();

    const config = {
        htmlAllowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'table', 'strong'],
        htmlAllowedAttrs: ['href'],
        htmlAllowedEmptyTags: ['a', 'hr', 'table', 'strong'],
        pluginsEnabled: ['link']
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    {intl.formatMessage({id: 'english'})}
                </Typography>
                <FroalaEditorComponent
                    model={data.privacyPolicy.en}
                    onModelChange={handleEnModelChange}
                    config={{
                        ...froalaEditorConfigWithoutMath,
                    }} 
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    {intl.formatMessage({id: 'traditional-chinese'})}
                </Typography>
                <FroalaEditorComponent 
                    model={data.privacyPolicy.zh_Hant}
                    onModelChange={handleZhHantModelChange}
                    config={{
                        ...froalaEditorConfigWithoutMath,
                        htmlAllowedTags: config.htmlAllowedTags,
                        htmlAllowedAttrs: config.htmlAllowedAttrs,
                        htmlAllowedEmptyTags: config.htmlAllowedEmptyTags,
                        pluginsEnabled: config.pluginsEnabled
                    }} 
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    {intl.formatMessage({id: 'simplified-chinese'})}
                </Typography>
                <FroalaEditorComponent
                    model={data.privacyPolicy.zh_Hans}
                    onModelChange={handleZhHansModelChange}
                    config={{
                        ...froalaEditorConfigWithoutMath,
                        htmlAllowedTags: config.htmlAllowedTags,
                        htmlAllowedAttrs: config.htmlAllowedAttrs,
                        htmlAllowedEmptyTags: config.htmlAllowedEmptyTags,
                        pluginsEnabled: config.pluginsEnabled
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default PrivacyPolicy;