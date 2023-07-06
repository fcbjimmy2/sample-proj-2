import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { BASE_URL, froalaEditorConfigWithoutMath } from '../../../config';

// material-ui
import { useTheme } from '@mui/material/styles';
import { 
    Alert, 
    Box, 
    Grid, 
    Link, 
    Stack, 
    Tab, 
    Tabs, 
    Typography, 
    MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// next
import { useRouter } from 'next/router';

// project imports
import { Upload } from '../../../components/upload';

// import FroalaEditorComponent from 'react-froala-wysiwyg';
const FroalaEditorComponent = dynamic(
    async () => {
        const values = await Promise.all([
            import("react-froala-wysiwyg"),
            import("froala-editor/js/froala_editor.min.js"),
            import("froala-editor/js/froala_editor.pkgd.min.js"),
            import("froala-editor/js/plugins.pkgd.min.js"),
            import("froala-editor/js/plugins/link.min.js"),
            import("froala-editor/js/plugins/lists.min.js"),
        ]);
        return values[0];
    },
    {
        ssr: false
    }
);

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import * as yup from 'yup';
import { useIntl } from 'react-intl';

// utils
import axios from '../../../utils/axios';

// components
import { ErrorScreen, LoadingScreen } from '../../../components';
import FormProvider, { RHFTextField, RHFCheckbox, RHFSelect } from '../../../components/hook-form';


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

const CourseInformation = ({ courseId }) => {
    const { push } = useRouter();

    const theme = useTheme();
    
    const intl = useIntl();
    
    const [isLoadingMaster, setIsLoadingMaster] = useState(false);
    const [isLoadingCourse, setIsLoadingCourse] = useState(true);
    const [hasError, setHasError] = useState(false);    
    
    const [courseCategories, setCourseCategories] = useState([]);    
    const [courseLevel, setCourseLevel] = useState([]);

    const loadMaster = async () => {
        const response_cat = await axios.get('/api/admin/material-course/course-categories');
        setCourseCategories(response_cat.data);
        const response_lv = await axios.get('/api/admin/material-course/course-level');
        setCourseLevel(response_lv.data);
    };
  
    useEffect(() => {
        if (!isLoadingCourse && !isLoadingMaster) {
            setIsLoadingMaster(true);
            loadMaster()
                .then(()=>{
                    setIsLoadingMaster(false);
                })
                .catch((error)=>{
                    console.error(error);
                    setHasError(true);
                })
        }
    }, [intl.locale]);

    const [htmlData, setHtmlData] = useState({
        description_en: '',
        information_en: '',
        description_zh_hant: '',
        information_zh_hant: '',
        description_zh_hans: '',
        information_zh_hans: '',
    });

    const [enVideoPhoto, setEnVideoPhoto] = useState(null);
    const [zhHantVideoPhoto, setZhHantVideoPhoto] = useState(null);
    const [zhHansVideoPhoto, setZhHansVideoPhoto] = useState(null);

    const [courseData, setCourseData] = useState({});

    const loadCourse = async () => {       
        const hasCourse = !!courseId;
        if (hasCourse) {
            const response = await axios.get('/api/admin/material-course/courses/' + courseId);
            if (response.status == 200) {
                const zhHantContentLang = response.data.content_languages.find(el => el.lang === "zh-Hant");
                const zhHansContentLang = response.data.content_languages.find(el => el.lang === "zh-Hans");
                setCourseData({
                    course_code: response.data.course_code,
                    course_category: response.data.course_category,
                    course_level: response.data.course_level,
                    course_credit: response.data.credit,
                    allow_use_free_credit: response.data.allow_free_credit,
                    course_title_en: response.data.course_title,
                    short_description_en: response.data.course_intro,
                    description_en: response.data.course_html_content,
                    information_en: response.data.course_html_footer,
                    video_photo_en: '',
                    course_title_zh_hant: zhHantContentLang.course_title,
                    short_description_zh_hant: zhHantContentLang.course_intro,
                    description_zh_hant: zhHantContentLang.course_html_content,
                    information_zh_hant: zhHantContentLang.course_html_footer,
                    video_photo_zh_hant: '',
                    course_title_zh_hans: zhHansContentLang.course_title,
                    short_description_zh_hans: zhHansContentLang.course_intro,
                    description_zh_hans: zhHansContentLang.course_html_content,
                    information_zh_hans: zhHansContentLang.course_html_footer,
                    video_photo_zh_hans: '',
                });
                setHtmlData({
                    description_en: response.data.course_html_content,
                    information_en: response.data.course_html_footer,
                    description_zh_hant: zhHantContentLang.course_html_content,
                    information_zh_hant: zhHantContentLang.course_html_footer,
                    description_zh_hans: zhHansContentLang.course_html_content,
                    information_zh_hans: zhHansContentLang.course_html_footer,
                });
            }
        } else {
            setCourseData({
                course_code: '',
                course_category: '',
                course_level: '',
                course_credit: '',
                allow_use_free_credit: '',
                course_title_en: '',
                short_description_en: '',
                description_en: '',
                information_en: '',
                video_photo_en: '',
                course_title_zh_hant: '',
                short_description_zh_hant: '',
                description_zh_hant: '',
                information_zh_hant: '',
                video_photo_zh_hant: '',
                course_title_zh_hans: '',
                short_description_zh_hans: '',
                description_zh_hans: '',
                information_zh_hans: '',
                video_photo_zh_hans: '',
            });
        }
    };
    
    const initialize = useCallback(async () => {
        try {
            await loadMaster();
            await loadCourse();
            setIsLoadingCourse(false);
        } catch (error) {
            console.error(error);
            setHasError(true);
        }
    }, []);  
  
    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        window.$ = require('jquery');
        window.FroalaEditor = require('froala-editor');
        require("@wiris/mathtype-froala3");
    }, []);    

    const [tab, setTab] = useState(0);
  
    const handleTabChange = (event, tab) => {
        setTab(tab);
    };

    const isDecimal = (val) => {
        let regex = /^[0-9]*$/;
        if (val != undefined) {
            return regex.test(val);
        }
        return true;
    };

    const handleDescriptionEnModelChange = (content) => {
        let tempData = htmlData;
        tempData.description_en = content;
        setHtmlData(tempData);
    }

    const handleInformationEnModelChange = (content) => {
        let tempData = htmlData;
        tempData.information_en = content;
        setHtmlData(tempData);
    }

    const handleDescriptionZhHantModelChange = (content) => {
        let tempData = htmlData;
        tempData.description_zh_hant = content;
        setHtmlData(tempData);
    }

    const handleInformationZhHantModelChange = (content) => {
        let tempData = htmlData;
        tempData.information_zh_hant = content;
        setHtmlData(tempData);
    }

    const handleDescriptionZhHansModelChange = (content) => {
        let tempData = htmlData;
        tempData.description_zh_hans = content;
        setHtmlData(tempData);
    }

    const handleInformationZhHansModelChange = (content) => {
        let tempData = htmlData;
        tempData.information_zh_hans = content;
        setHtmlData(tempData);
    }

    const accept = {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/gif': ['.gif'],
    }

    const handleEnFileDrop = async (acceptedFiles) => {
        if (acceptedFiles.length > 0 ) {
            try {
                const formdata = new FormData();
                formdata.append("file", acceptedFiles[0]);

                const headers = {
                    'Content-Type': 'multipart/form-data'
                };

                const response = await axios.post('/api/files/23', formdata, {headers: headers});
                console.log(response.data)

            } catch (error) {
                console.log('error', error);
            }
        }
    };

    const handleZhHantFileDrop = async (acceptedFiles) => {
        if (acceptedFiles.length > 0 ) {
            try {
                const formdata = new FormData();
                formdata.append("file", acceptedFiles[0]);

                const headers = {
                    'Content-Type': 'multipart/form-data'
                };

                const response = await axios.post('/api/files/23', formdata, {headers: headers});
                console.log(response.data)

            } catch (error) {
                console.log('error', error);
            }
        }
    };

    const handleZhHansFileDrop = async (acceptedFiles) => {
        if (acceptedFiles.length > 0 ) {
            try {
                const formdata = new FormData();
                formdata.append("file", acceptedFiles[0]);

                const headers = {
                    'Content-Type': 'multipart/form-data'
                };

                const response = await axios.post('/api/files/23', formdata, {headers: headers});
                console.log(response.data)

            } catch (error) {
                console.log('error', error);
            }
        }
    };

    const updateUserSchema = yup.object().shape({
        course_code: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        course_category: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        course_level: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        course_credit: yup.string().required(intl.formatMessage({id: 'This field is required'}))
            .test("is-decimal","Price is invalid",isDecimal),
        course_title_en: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        short_description_en: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        course_title_zh_hant: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        short_description_zh_hant: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        course_title_zh_hans: yup.string().required(intl.formatMessage({id: 'This field is required'})),
        short_description_zh_hans: yup.string().required(intl.formatMessage({id: 'This field is required'})),
    });

    const values = {
        course_code: courseData?.course_code || '',
        course_category: courseData?.course_category || '',
        course_level: courseData?.course_level || '',
        course_credit: courseData?.course_credit || '',
        allow_use_free_credit: courseData?.allow_use_free_credit || false,
        course_title_en: courseData?.course_title_en || '',
        short_description_en: courseData?.short_description_en || '',
        course_title_zh_hant: courseData?.course_title_zh_hant || '',
        short_description_zh_hant: courseData?.short_description_zh_hant || '',
        course_title_zh_hans: courseData?.course_title_zh_hans || '',
        short_description_zh_hans: courseData?.short_description_zh_hans || ''
    };
    
    const methods = useForm({
      resolver: yupResolver(updateUserSchema),
      values,
    });
    
    const {
        setError,
        handleSubmit,
        formState: { errors, isSubmitting  }
    } = methods;

    const onSubmit = async (data) => {
      try {
        const hasCourse = !!courseId;   
        
        const body = {
            course_code: data?.course_code??'',
            course_category: data?.course_category??'',
            course_level: data?.course_level??'',
            course_title: data?.course_title_en??'',
            course_intro: data?.short_description_en??'',
            course_html_content: htmlData?.description_en??'',
            course_html_footer: htmlData?.information_en??'',
            credit: data?.course_credit??'',
            allow_free_credit: data?.allow_use_free_credit??'',
            content_languages: [
                {
                    lang: 'zh-Hant',
                    course_title: data?.course_title_zh_hant??'',
                    course_intro: data?.short_description_zh_hant??'',
                    course_html_content: htmlData?.description_zh_hant??'',
                    course_html_footer: htmlData?.information_zh_hant??'',
                },
                {
                    lang: 'zh-Hans',
                    course_title: data?.course_title_zh_hans??'',
                    course_intro: data?.short_description_zh_hans??'',
                    course_html_content: htmlData?.description_zh_hans??'',
                    course_html_footer: htmlData?.information_zh_hans??'',
                },
            ]
        };     

        if (hasCourse) {
            await axios.put('/api/admin/material-course/courses/' + courseId, body);

        } else {
            const response = await axios.post('/api/admin/material-course/courses', body);
            push(BASE_URL + '/admin/material-course/courses/' + response.data.id + '/lessons');
        }
      } catch (error) {
        console.log(error);
        setError('afterSubmit', {
          ...error,
          message: error.message || error,
        });
      }
    };

    if (hasError) {   
        return <ErrorScreen />;     
    }
    
    if (isLoadingMaster || isLoadingCourse) {
        return <LoadingScreen />;
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ my: 0 }} spacing={2}>
                {!!errors.afterSubmit && (
                    <Grid item xs={12} sm={12} lg={12}>
                        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>{errors.afterSubmit.message}</Alert>
                    </Grid>
                )}
                <Grid item xs={12} sm={6} lg={6}>
                    <RHFTextField name="course_code" label={intl.formatMessage({id: 'course-code'})} disabled={isSubmitting} />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <RHFSelect name="course_category" label={intl.formatMessage({id: 'course-category'})} disabled={isSubmitting}>
                        <MenuItem value="">&nbsp;</MenuItem>
                        {courseCategories.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.text}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <RHFSelect name="course_level" label={intl.formatMessage({id: 'course-level'})} disabled={isSubmitting}>
                        <MenuItem value="">&nbsp;</MenuItem>
                        {courseLevel.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.text}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <RHFTextField name="course_credit" label={intl.formatMessage({id: 'course-price'})} disabled={isSubmitting} />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>                    
                    <RHFCheckbox name="allow_use_free_credit" label={intl.formatMessage({id: 'allow-to-use-free-credit'})} disabled={isSubmitting} />                  
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <Tabs
                        value={tab}
                        variant="scrollable"
                        onChange={handleTabChange}
                    >
                        <Tab
                            disabled={isSubmitting} 
                            component={Link}
                            to="#"
                            label={intl.formatMessage({id: 'english'})}
                            {...a11yProps(0)} 
                            sx={{
                                ...( (!!errors?.course_title_en || !!errors?.short_description_en)
                                    && {
                                        color: theme.palette.error.main + ' !important'
                                    }
                                )                            
                            }}
                        />
                        <Tab
                            disabled={isSubmitting} 
                            component={Link}
                            to="#"
                            label={intl.formatMessage({id: 'traditional-chinese'})}
                            {...a11yProps(0)}
                            sx={{
                                ...( (!!errors?.course_title_zh_hant || !!errors?.short_description_zh_hant)
                                    && {
                                        color: theme.palette.error.main + ' !important'
                                    }
                                )                            
                            }}
                        />
                        <Tab
                            disabled={isSubmitting} 
                            component={Link}
                            to="#"
                            label={intl.formatMessage({id: 'simplified-chinese'})}
                            {...a11yProps(0)}
                            sx={{
                                ...( (!!errors?.course_title_zh_hans || !!errors?.short_description_zh_hans)
                                    && {
                                        color: theme.palette.error.main + ' !important'
                                    }
                                )                            
                            }}
                        />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="course_title_en" 
                                    name="course_title_en" 
                                    label={intl.formatMessage({id: 'Course Title'}) + ' (' + intl.formatMessage({id: 'english'}) + ')'} 
                                    disabled={isSubmitting} 
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="short_description_en" 
                                    name="short_description_en" 
                                    label={intl.formatMessage({id: 'Short Description'}) + ' (' + intl.formatMessage({id: 'english'}) + ')'} 
                                    fullWidth 
                                    multiline 
                                    rows={3} 
                                    disabled={isSubmitting} />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'description'})} ({intl.formatMessage({id: 'english'})})
                                </Typography>
                                <FroalaEditorComponent
                                    onModelChange={handleDescriptionEnModelChange}
                                    model={htmlData.description_en}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'Information'})} ({intl.formatMessage({id: 'english'})})
                                </Typography>
                                <FroalaEditorComponent 
                                    onModelChange={handleInformationEnModelChange}
                                    model={htmlData.information_en}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} 
                                    style={{
                                        ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                    }}>
                                    {intl.formatMessage({id: 'Upload video/photo'})} ({intl.formatMessage({id: 'english'})})
                                </Typography>
                                <Upload file={enVideoPhoto} accept={accept} onDrop={handleEnFileDrop} disabled={isSubmitting} />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="course_title_zh_hant" 
                                    name="course_title_zh_hant" 
                                    label={intl.formatMessage({id: 'Course Title'}) + ' (' + intl.formatMessage({id: 'traditional-chinese'}) + ')'} 
                                    fullWidth 
                                    disabled={isSubmitting} />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="short_description_zh_hant" 
                                    name="short_description_zh_hant" 
                                    label={intl.formatMessage({id: 'Short Description'}) + ' (' + intl.formatMessage({id: 'traditional-chinese'}) + ')'} 
                                    fullWidth 
                                    multiline 
                                    rows={3} 
                                    disabled={isSubmitting} />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'description'})} ({intl.formatMessage({id: 'traditional-chinese'})})
                                </Typography>
                                <FroalaEditorComponent 
                                    onModelChange={handleDescriptionZhHantModelChange}
                                    model={htmlData.description_zh_hant}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'Information'})} ({intl.formatMessage({id: 'traditional-chinese'})})
                                </Typography>
                                <FroalaEditorComponent 
                                    onModelChange={handleInformationZhHantModelChange}
                                    model={htmlData.information_zh_hant}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}
                                    style={{
                                        ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                    }}>
                                    {intl.formatMessage({id: 'Upload video/photo'})} ({intl.formatMessage({id: 'traditional-chinese'})})
                                </Typography>
                                <Upload file={zhHantVideoPhoto} accept={accept} onDrop={handleZhHantFileDrop} disabled={isSubmitting} />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="course_title_zh_hans" 
                                    name="course_title_zh_hans" 
                                    label={intl.formatMessage({id: 'Course Title'}) + ' (' + intl.formatMessage({id: 'simplified-chinese'}) + ')'} 
                                    fullWidth 
                                    disabled={isSubmitting} />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField 
                                    id="short_description_zh_hans" 
                                    name="short_description_zh_hans" 
                                    label={intl.formatMessage({id: 'Short Description'}) + ' (' + intl.formatMessage({id: 'simplified-chinese'}) + ')'} 
                                    fullWidth 
                                    multiline 
                                    rows={3} 
                                    disabled={isSubmitting} />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'description'})} ({intl.formatMessage({id: 'simplified-chinese'})})
                                </Typography>
                                <FroalaEditorComponent 
                                    onModelChange={handleDescriptionZhHansModelChange}
                                    model={htmlData.description_zh_hans}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12} style={{
                                    ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    {intl.formatMessage({id: 'Information'})} ({intl.formatMessage({id: 'simplified-chinese'})})
                                </Typography>
                                <FroalaEditorComponent 
                                    onModelChange={handleInformationZhHansModelChange}
                                    model={htmlData.information_zh_hans}
                                    config={{
                                        ...froalaEditorConfigWithoutMath
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}
                                    style={{
                                        ...(isSubmitting? {pointerEvents: 'none', opacity: 0.4}: null)                                
                                    }}>
                                    {intl.formatMessage({id: 'Upload video/photo'})} ({intl.formatMessage({id: 'simplified-chinese'})})
                                </Typography>
                                <Upload file={zhHansVideoPhoto} accept={accept} onDrop={handleZhHansFileDrop} disabled={isSubmitting} />
                            </Grid>
                        </Grid>                    
                    </TabPanel>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <Stack direction="row" justifyContent="flex-end">
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            {!!courseId ? intl.formatMessage({id: 'Save'}) : intl.formatMessage({id: 'Create'})}
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

CourseInformation.propTypes = {
    courseId: PropTypes.string
};

export default CourseInformation;
