import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// project imports
import LessonItem from './LessonItem'

// material-ui
import { Alert, Button, Stack } from '@mui/material';

// form
import { useForm } from 'react-hook-form';

// components
import { ErrorScreen, LoadingScreen } from '../../../components';
import FormProvider from '../../../components/hook-form';

const CourseLesson = ({ courseId }) => {
    const intl = useIntl();
    
    const [isLoading, setIsLoading] = useState(true);  
    const [hasError, setHasError] = useState(false);    

    const [lessons, setLessons] = useState([]);    

    const loadMLessions = async () => {
        // const response = await axios.get('/api/admin/material-course/course-categories');
        // setLessons(response.data);
    };
        
    const initialize = useCallback(async () => {
        try {
            await loadMLessions();
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setHasError(true);
        }
    }, []);  
  
    useEffect(() => {
        initialize();
    }, [initialize]);
    
    const methods = useForm();
    
    const {
        handleSubmit
    } = methods;

    const [errors, setError] = useState({});

    const handleAddLesson = () => {
        const new_lesson = {
            title: "",
            detail: "", 
            error: {
                title: null,
                detail: null, 
            },
            expanded: true
        }
        let temp_lessons = [...lessons];
        temp_lessons.push(new_lesson);  
        setLessons(temp_lessons);

        setError(undefined);
    };

    const handleTitleChanged = (index, title) => {
        let temp_lessons = [...lessons];
        temp_lessons[index].title = title;
        if (!title) {
            temp_lessons[index].error.title = intl.formatMessage({id: 'This field is required'});
        } else {
            temp_lessons[index].error.title = null;
        }
        setLessons(temp_lessons);

        setError(undefined);
    };

    const handleDetailChanged = (index, detail) => {
        let temp_lessons = [...lessons];
        temp_lessons[index].detail = detail;
        if (!detail) {
            temp_lessons[index].error.detail = intl.formatMessage({id: 'This field is required'});
        } else {
            temp_lessons[index].error.detail = null;
        }
        setLessons(temp_lessons);

        setError(undefined);
    };
    
    const handleDeleted = (index) => {
        let temp_lessons = [...lessons];
        temp_lessons.splice(index, 1);
        setLessons(temp_lessons);

        setError(undefined);
    }
    
    const handleExpanded = (index, expanded) => {
        let temp_lessons = [...lessons];
        temp_lessons[index].expanded = expanded;
        setLessons(temp_lessons);

        setError(undefined);
    }
    
    const onSubmit = async () => {
      try {
        // let temp_lessons = [...lessons];
        // if (temp_lessons.length > 0) {
        //     for (let i=0; i < temp_lessons.length; i++) {
        //         if (!temp_lessons[i].title) {
        //             temp_lessons[i].error.title = intl.formatMessage({id: 'This field is required'});
        //             temp_lessons[i].expanded = true;
        //         } else {
        //             temp_lessons[i].error.title = null;
        //         }         
        //         if (!temp_lessons[i].detail) {
        //             temp_lessons[i].error.detail = intl.formatMessage({id: 'This field is required'});
        //             temp_lessons[i].expanded = true;
        //         } else {
        //             temp_lessons[i].error.detail = null;
        //         }
        //     }
        //     setLessons(temp_lessons);
        //     const errorFound = temp_lessons.find(e => (!!e.error?.title || !!e.error?.detail));
        //     if (!errorFound) {
        //         setErrorIndex(1);        
        //         setCourseData({
        //             ...courseData, 
        //             lessons: lessons
        //         });
        //         handleNext();
        //     }
        // } else {
        //     setError({
        //         message: intl.formatMessage({ id: 'Please add lesson(s)' }),
        //     });
        // }
      } catch (error) {
        console.error(error);
        setError({
            message: error.message || error,
        });
      }
    };

    if (hasError) {   
        return <ErrorScreen />;     
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" onClick={handleAddLesson}>{intl.formatMessage({id: 'Add Lesson'})}</Button>
            </Stack>
            <Stack sx={{ mt: 2, mb: 1 }}>
                {lessons?.map((lessonItem, index) => (
                    <LessonItem 
                        lessonItem={{index: index, ...lessonItem}} 
                        key={index} 
                        onTitleChanged={handleTitleChanged} 
                        onDetailChanged={handleDetailChanged} 
                        onDeleted={handleDeleted} 
                        onExpanded={handleExpanded}
                    />
                ))}
            </Stack>
            {!!errors?.message && (
                <Stack sx={{ my: 1 }}>
                    <Alert variant="filled" severity="error" sx={{ width: '100%' }}>{errors.message}</Alert>
                </Stack>
            )}
            <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" type="submit">
                    {intl.formatMessage({id: 'Save'})}
                </Button>
            </Stack>
        </FormProvider>
    );
};

CourseLesson.propTypes = {
    courseId: PropTypes.string,
};

export default CourseLesson;