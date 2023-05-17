import { ISplit } from '@/pages/splits';
import AuthHeader from '@/utils/authrorizationHeader';
import {
  Badge,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface ISplitCard {
  split: ISplit;
}

export default function SplitCard({ split }: ISplitCard) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    var roles = sessionStorage.getItem('roles');
    if (roles) {
      setIsAdmin(roles.includes('Admin'));
    }
  }, []);

  const viewHandler = (id: string) => {
    router.push(`/splits/${id}`);
  };

  const editHandler = (id: string) => {
    router.push(`/splits/insert-split?id=${id}`);
  };

  const deleteHandler = async (id: string) => {
    let res = confirm('Are you sure you want to delete this split?');
    if (res) {
      try {
        await axios.post(`https://localhost:7132/Split/deleteSplit`, id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthHeader(),
          },
        });
      } catch (err) {}
    }
  };

  return (
    <Box
      sx={{
        paddingX: 6,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10
      }}
    >
      <Stack
        sx={{
          width: '65rem',
          height: '20rem',
          flexDirection: 'row',
          bgcolor: 'white',
          boxShadow: '2xl',
          spacing: 8,
          border: '1px solid black',
        }}
      >
        <Box
          sx={{
            width: '20rem',
            borderTopLeftRadius: '3xl',
            bgcolor: '#393E46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#efefef',
          }}
        >
          <Typography variant="h4">{split.name}</Typography>
        </Box>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          pt={2}
        >
          <Box sx={{ flexDirection: 'row' }}>
            <Typography variant="h5" fontFamily={'body'}>
              Rating: {split.rating}
              {/* <StarIcon color="yellow" /> */}
            </Typography>
          </Box>
          <Typography color="gray.500" mb={4}>
            @{split.creatorName}
          </Typography>
          <Typography textAlign={'center'} color={'gray.700'} px={3}>
            {split.description}
          </Typography>
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'row'}
            mt={6}
          >
            <Typography>Workouts: </Typography>
            {split.workouts.map((w, index) => {
              return (
                <Badge
                  sx={{ px: 2, py: 1, bg: 'gray', fontWeight: 400 }}
                  key={index}
                >
                  {w}
                </Badge>
              );
            })}
          </Stack>
          <Stack
            width={'100%'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {/* <Button
              sx={{
                fontSize: 16,
                boxShadow:
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
              }}
              onClick={() => viewHandler(split.splitId)}
            >
              View
            </Button> */}
            <Link
              style={{ flex: '1 1 0', fontSize: '10px' }}
              href={`/splits/${split.splitId.toString()}`}
            >
              View
            </Link>
            {isAdmin && (
              <>
                <Button
                  sx={{
                    fontSize: 16,
                    bgcolor: 'yellow',
                    color: 'black',
                    boxShadow:
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                  }}
                  onClick={(e) => editHandler(split.splitId)}
                >
                  Edit
                </Button>
                <Button
                sx={{
                    fontSize: 16,
                    bgcolor: 'red',
                    color: 'white',
                    boxShadow:
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                  }}
                  onClick={(e) => deleteHandler(split.splitId)}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
