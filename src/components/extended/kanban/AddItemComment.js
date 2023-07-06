import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// components
import Iconify from '../../Iconify';

// project imports
import { useSnackbar } from '../../snackbar';
import { useDispatch, useSelector } from '../../../store';
import { addItemComment } from '../../../store/slices/kanban';

// ==============================|| KANBAN BOARD - ADD ITEM COMMENT ||============================== //

const AddItemComment = ({ itemId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { comments, items } = useSelector((state) => state.kanban);
    const { enqueueSnackbar } = useSnackbar();

    const [comment, setComment] = useState('');
    const [isComment, setIsComment] = useState(false);

    const addTaskComment = () => {
        if (comment.length > 0) {
            const newComment = {
                id: 0,
                comment,
                profileId: 'profile-1'
            };

            dispatch(addItemComment(itemId, newComment, items, comments));
            enqueueSnackbar('Comment Add successfully', {
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            });

            setComment('');
        } else {
            setIsComment(true);
        }
    };

    const handleAddTaskComment = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addTaskComment();
        }
    };

    const handleTaskComment = (event) => {
        const newComment = event.target.value;
        setComment(newComment);
        if (newComment.length <= 0) {
            setIsComment(true);
        } else {
            setIsComment(false);
        }
    };

    return (
        <Box
            sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
            }}
        >
            <Grid container alignItems="center" spacing={0.5}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Add Comment"
                        value={comment}
                        onChange={handleTaskComment}
                        sx={{
                            mb: 2,
                            '& input': { bgcolor: 'transparent', p: 0, borderRadius: '0px' },
                            '& fieldset': { display: 'none' },
                            '& .MuiFormHelperText-root': {
                                ml: 0
                            },
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'transparent'
                            }
                        }}
                        onKeyUp={handleAddTaskComment}
                        helperText={isComment ? 'Comment is required.' : ''}
                        error={isComment}
                    />
                </Grid>
                <Grid item>
                    <Button 
                        variant="text" 
                        color="primary" 
                        sx={{ p: 0.5, minWidth: 32 }}
                        startIcon={<Iconify icon="eva:phone-fill" />}
                    >
                        Photo
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="text" 
                        color="primary" 
                        sx={{ p: 0.5, minWidth: 32 }}
                        startIcon={<Iconify icon="eva:file-text-fill" />}
                    >
                        File
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="text" 
                        color="primary" 
                        sx={{ p: 0.5, minWidth: 32 }}
                        startIcon={<Iconify icon="eva:hard-drive-fill" />}
                    >
                        Drive
                    </Button>
                </Grid>
                <Grid item xs zeroMinWidth />
                <Grid item>
                    <Button variant="contained" color="primary" onClick={addTaskComment}>
                        Comment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

AddItemComment.propTypes = {
    itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default AddItemComment;
