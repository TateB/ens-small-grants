import { Box, Text, Image, Flex, Center, Spinner } from '@chakra-ui/react';
import moment from 'moment';
import { Routes, Route } from 'react-router-dom';

import daoLogoSrc from './assets/dao_purple.svg';
import { ConnectButton } from './components/ConnectButton';
import { Proposal } from './components/Proposal';
import { RoundCards } from './components/RoundCards';
import { useRounds, Round as RoundType } from './hooks';
import { CreateProposal } from './screens/CreateProposal';
import { CreateSnapshot } from './screens/CreateSnapshot';
import { Round } from './screens/Round';

const MAX_WIDTH = '1200px';

const isActiveRound = (round: RoundType) => moment(round.voting_end).isAfter(moment());

function Home() {
  const { rounds, loading } = useRounds();
  if (loading || !rounds) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (rounds.length === 0) {
    return (
      <Center>
        <Text>No rounds created yet...</Text>
      </Center>
    );
  }

  const activeRounds = rounds.filter(r => isActiveRound(r));
  const fundedRounds = rounds.filter(r => !isActiveRound(r));

  return (
    <Box alignItems="center" flexDirection="column" display="flex">
      <Box width="100%" maxWidth={MAX_WIDTH} paddingBottom="100px">
        <Flex flexDirection="column" gap="42px">
          <Flex flexDirection="column" gap="24px">
            <Text>
              ENS Small Grants are small, quickly executable grants that are funded over a short period. Each round
              consists of a few days in which anyone can propose a project for funding, followed by a few days where
              $ENS token holders can vote for the best proposals. At the end of the voting period, the top voted
              projects each get a share of the rounds funding pool.
            </Text>
          </Flex>

          {activeRounds && activeRounds.length > 0 && <RoundCards label="Active Rounds" rounds={activeRounds} />}

          {fundedRounds && fundedRounds.length > 0 && <RoundCards label="Past Rounds" rounds={fundedRounds} />}
        </Flex>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Box flexDirection="column" display="flex" width="100%" padding="36px">
      <Box justifyContent="center" display="flex" width="100%" paddingBottom="36px">
        <Box alignItems="center" flexDirection="row" display="flex" width="100%" maxWidth={MAX_WIDTH}>
          <Flex alignItems={{ base: 'left', sm: 'center' }} flexDirection={{ base: 'column', sm: 'row' }} gap="8px">
            <a href="/">
              <Image height="48px" src={daoLogoSrc} />
            </a>
            <Text fontWeight="bold" size="2xl">
              Small Grants
            </Text>
          </Flex>
          <Box marginLeft="auto">
            <ConnectButton showBalance={false} />
          </Box>
        </Box>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_proposal" element={<CreateProposal />} />
        <Route path="/rounds/:id" element={<Round />} />
        <Route path="/rounds/:roundId/proposals/:id" element={<Proposal />} />
        <Route path="/rounds/:roundId/snapshot" element={<CreateSnapshot />} />
      </Routes>
    </Box>
  );
}

export default App;
