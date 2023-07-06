import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

// utils
import axios from '../../../src/utils/axios';

// material-ui
import { 
    Alert, 
    Button,
    Box,
    Tab,
    Tabs,
    Typography,
    Stack
} from '@mui/material';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import MainCard from '../../../src/components/cards/MainCard';
import { TermsOfService, PrivacyPolicy } from '../../../src/sections/admin/system/content-settings';

// third-party
import { useIntl } from 'react-intl';

// components
import { ErrorScreen, LoadingScreen } from '../../../src/components';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const ContentSettings = () => {
    const intl = useIntl();
    const [tab, setTab] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const [isSaveFailed, setIsSaveFailed] = useState(false);
    
    const initialize = useCallback(async () => {
        if (isLoading) {     
            try {
              const response = await axios.get('/api/admin/content-settings');
              setData(response.data);
              setIsLoading(false);
            } catch (error) {
              setError(true);
            }
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);
    
    if (error) {
      return <ErrorScreen />;
    }  

    if (isLoading) {
      return <LoadingScreen />;
    }

    const handleTermsOfServiceEnModelChange = (content) => {
        let tempData = data;
        tempData.termsOfService.en = content;
        setData(tempData);
    }

    const handleTermsOfServiceZhHantModelChange = (content) => {
        let tempData = data;
        tempData.termsOfService.zh_Hant = content;
        setData(tempData);
    }

    const handleTermsOfServiceZhHansModelChange = (content) => {
        let tempData = data;
        tempData.termsOfService.zh_Hans = content;
        setData(tempData);
    }

    const handlePrivacyPolicyEnModelChange = (content) => {
        let tempData = data;
        tempData.privacyPolicy.en = content;
        setData(tempData);
    }

    const handlePrivacyPolicyZhHantModelChange = (content) => {
        let tempData = data;
        tempData.privacyPolicy.zh_Hant = content;
        setData(tempData);
    }

    const handlePrivacyPolicyZhHansModelChange = (content) => {
        let tempData = data;
        tempData.privacyPolicy.zh_Hans = content;
        setData(tempData);
    }

    const handleTabChange = (event, tab) => {
        setTab(tab);
    };

    const tables = {
        "terms-of-service": <TermsOfService data={data} handleEnModelChange={handleTermsOfServiceEnModelChange} handleZhHantModelChange={handleTermsOfServiceZhHantModelChange} handleZhHansModelChange={handleTermsOfServiceZhHansModelChange} />,
        "privacy-policy": <PrivacyPolicy data={data} handleEnModelChange={handlePrivacyPolicyEnModelChange} handleZhHantModelChange={handlePrivacyPolicyZhHantModelChange} handleZhHansModelChange={handlePrivacyPolicyZhHansModelChange} />
    };
   
    const onSave = async () => {
        setIsSaveSuccess(false);
        setIsSaveFailed(false);
        try {
            await axios.put('/api/admin/content-settings', {
                termsOfService: data.termsOfService,
                privacyPolicy: data.privacyPolicy,
            });
            setIsSaveSuccess(true);
        } catch (error) {
            setIsSaveFailed(true);
        }
        return false;
    };

    return (
        <MainCard title={intl.formatMessage({id: 'content-settings'})} boxShadow>  
            <form>
                {isSaveSuccess && <Alert variant="filled" severity="success" sx={{ width: '100%', mb: 3 }}>{intl.formatMessage({id: 'save-success'})}</Alert>}
                {isSaveFailed && <Alert variant="filled" severity="error" sx={{ width: '100%', mb: 3 }}>{intl.formatMessage({id: 'unexpected-error-occurred'})}</Alert>}
                <Tabs
                    value={tab}
                    variant="scrollable"
                    onChange={handleTabChange}
                >
                    {Object.keys(tables).map((table, index) =>(
                        <Tab
                            key={index}
                            to="#"
                            label={intl.formatMessage({id: table})}
                            {...a11yProps(0)}
                        />
                    ))}
                </Tabs>
                {Object.values(tables).map((table, index) =>(
                    <TabPanel key={index} value={tab} index={index}>
                        {table}
                    </TabPanel>
                ))}                
                <Stack direction="row" justifyContent="flex-end">
                    <Button variant="contained" sx={{ my: 3, ml: 1 }} type="button" onClick={onSave}>
                        {intl.formatMessage({id: 'save'})}
                    </Button>
                </Stack>
            </form>
        </MainCard>
    );
};

export default ContentSettings;

// ----------------------------------------------------------------------

ContentSettings.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};