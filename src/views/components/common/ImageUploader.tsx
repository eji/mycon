import React, { useState } from 'react';
import {
  ButtonBase,
  createStyles,
  makeStyles,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(() =>
  createStyles({
    selectPhotoButton: {
      width: '100%',
      height: 150,
      backgroundColor: '#ddd',
    },
    selectPhotoInputLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 150,
    },
    selectPhotoButtonIcon: {
      width: 100,
      height: 100,
      color: '#999',
    },
    selectPhotoInput: {
      display: 'none',
    },
    imageButton: {
      width: '100%',
    },
  })
);

type ResizeResult = {
  thumbnailUrl: string;
};

const resizeImage = async (imageFile: File): Promise<ResizeResult> => {
  return new Promise(
    (
      resolveFunc: (result: ResizeResult) => void,
      rejectFunc: () => void
    ): void => {
      const img = new Image();
      img.onload = function (): unknown {
        const max = 300;
        if (img.width > max) {
          const oc = document.createElement('canvas');
          const octx = oc.getContext('2d');
          if (octx == null) {
            return rejectFunc();
          }
          oc.width = img.width;
          oc.height = img.height;
          octx.drawImage(img, 0, 0);
          if (img.width > img.height) {
            oc.height = (img.height / img.width) * max;
            oc.width = max;
          } else {
            oc.width = (img.width / img.height) * max;
            oc.height = max;
          }
          octx.drawImage(oc, 0, 0, oc.width, oc.height);
          octx.drawImage(img, 0, 0, oc.width, oc.height);
          resolveFunc({ thumbnailUrl: oc.toDataURL() });
        } else {
          const imageUrl = URL.createObjectURL(imageFile);
          resolveFunc({ thumbnailUrl: imageUrl });
        }
        return null;
      };

      img.src = URL.createObjectURL(imageFile);
    }
  );
};

type Props = {
  registeredImageUrl?: string | null;
  handleUploadImage: (url: string) => void;
};

const ImageUploader: React.FC<Props> = (props: Props) => {
  const { handleUploadImage } = props;
  const registeredImageUrl = props?.registeredImageUrl || null;
  const classes = useStyles();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<null | string>(
    registeredImageUrl
  );
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickImage = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleDeleteImage = (): void => {
    setUploadedImageUrl(null);
    handleCloseDialog();
  };

  const hiddenImageId = 'take-picture';

  const handleChangeImage = (): void => {
    const hiddenImageElement = document.getElementById(hiddenImageId);
    if (hiddenImageElement == null) {
      return;
    }
    hiddenImageElement.click();
    handleCloseDialog();
  };

  const handleUploadeImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = e.target;
    if (files == null || files.length === 0) {
      return;
    }
    const file = files[0];
    const result = await resizeImage(file);
    handleUploadImage(result.thumbnailUrl);
    setUploadedImageUrl(result.thumbnailUrl);
  };

  const hiddenImage = (
    <input
      type="file"
      id={hiddenImageId}
      accept="image/*"
      className={classes.selectPhotoInput}
      onChange={handleUploadeImage}
    />
  );

  return (
    <>
      {!uploadedImageUrl && (
        <ButtonBase className={classes.selectPhotoButton}>
          <label
            htmlFor="take-picture"
            className={classes.selectPhotoInputLabel}
          >
            <AddAPhotoIcon className={classes.selectPhotoButtonIcon} />
            {hiddenImage}
          </label>
        </ButtonBase>
      )}
      {uploadedImageUrl && (
        <>
          <ButtonBase
            onClick={handleClickImage}
            className={classes.imageButton}
          >
            <img src={uploadedImageUrl} alt="foodstuff" />
          </ButtonBase>
          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="simple-dialog-title"
            open={openDialog}
          >
            {/* TODO: 後で直すこと */}
            <DialogTitle id="simple-dialog-title">食材の写真</DialogTitle>
            <Divider />
            <List>
              <ListItem button onClick={handleChangeImage} key="change-photo">
                <ListItemText primary="写真の変更" />
              </ListItem>
              <ListItem button onClick={handleDeleteImage} key="change-photo">
                <ListItemText primary="写真の削除" />
              </ListItem>
            </List>
          </Dialog>
          {hiddenImage}
        </>
      )}
    </>
  );
};

export default ImageUploader;
