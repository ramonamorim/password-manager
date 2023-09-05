import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type CardProps = {
    name : string
    username : string
}


export default function CardPassword(props : CardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
           { props.name }
           </Typography>
           <Typography gutterBottom variant="h6" component="div" color={'GrayText'}>
           { props.username }
           </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}