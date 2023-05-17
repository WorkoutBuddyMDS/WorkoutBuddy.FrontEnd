import { Box, Stack } from "@mui/material";
import Comment from "./CommentCard";
import { IComment } from "@/pages/splits/[splitId]";
  
interface ICommentsProps{
    comments: IComment[],
    addHandler: (text: string, parentCommentId?: string) => Promise<void>
}
  export default function Comments(props: ICommentsProps) {
    console.log(props.comments)
    //const [comments, setComments] = useState(props.comments);
  
    return (
      <Box
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        flexDirection={"column"}
        width={"full"}
      >
        <Stack spacing="3rem">
          {props.comments.map((comment, index) => (
            <Comment {...comment} key={comment.commentId} index={index} addHandler={props.addHandler} isReply="true"/>
          ))}
        </Stack>
      </Box>
    );
  }