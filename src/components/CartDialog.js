import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import { blue } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import { cartReset } from '../actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const CartDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { onClose,  open } = props

  const handleClose = () => {
    dispatch(cartReset())
    onClose()
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Thanks for the purchase!! You can find me at:</DialogTitle>
      <List>
          <ListItem button  onClick={()=> window.open("https://github.com/thaydds", "_blank")}  key={'GitHub'}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'Github'} />
          </ListItem>
      </List>
      <List>
          <ListItem button onClick={()=> window.open("https://www.linkedin.com/in/thayrone-dayvid/", "_blank")}  key={'Linkedin'}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <IconButton  >
                  <PersonIcon />
                </IconButton>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'Linkedin'} />
          </ListItem>
      </List>
      <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close and reset cart
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default CartDialog

CartDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
