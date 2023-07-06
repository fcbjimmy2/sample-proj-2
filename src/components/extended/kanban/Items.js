import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ButtonBase, CardMedia, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';

// third-party
import { Draggable } from 'react-beautiful-dnd';

// project imports
import AlertItemDelete from './AlertItemDelete';
import { useSnackbar } from '../../snackbar';
import { useDispatch, useSelector } from '../../../store';
import { selectItem, deleteItem } from '../../../store/slices/kanban';

// assets
import Iconify from '../../Iconify';

// item drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => {
    const bgcolor = theme.palette.background.paper + 90;
    return {
        userSelect: 'none',
        margin: `0 0 ${8}px 0`,
        padding: 16,
        border: '1px solid',
        borderColor: theme.palette.background.default,
        backgroundColor: isDragging ? bgcolor : theme.palette.background.paper,
        borderRadius: radius,
        ...draggableStyle
    };
};

// ==============================|| KANBAN BOARD - ITEMS ||============================== //

const Items = ({ item, index }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const kanban = useSelector((state) => state.kanban);
    const { items, columns } = kanban;

    const handlerDetails = (id) => {
        dispatch(selectItem(id));
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const handleModalClose = (status) => {
        setOpen(false);
        if (status) {
            //dispatch(deleteItem(item.id, items, columns, userStory));
            dispatch(
                enqueueSnackbar('Task Deleted successfully', {
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme)}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0 }}>
                        <Typography
                            onClick={() => handlerDetails(item.id)}
                            variant="subtitle1"
                            sx={{
                                display: 'inline-block',
                                width: 'calc(100% - 34px)',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                verticalAlign: 'middle',
                                cursor: 'pointer'
                            }}
                        >
                            {item.title}
                        </Typography>

                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick} aria-controls="menu-comment" aria-haspopup="true">
                            <IconButton component="span" size="small" disableRipple>
                                <Iconify icon="iwwa:option" fontSize="inherit" />
                            </IconButton>
                        </ButtonBase>
                        <Menu
                            id="menu-comment"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handlerDetails(item.id);
                                }}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    setOpen(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        {open && <AlertItemDelete title={item.title} open={open} handleClose={handleModalClose} />}
                    </Stack>
                </div>
            )}
        </Draggable>
    );
};

Items.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object
};

export default Items;
