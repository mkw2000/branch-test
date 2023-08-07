/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import branch from 'react-native-branch';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const initBranch = async () => {
    // Listener
    branch.subscribe({
      onOpenStart: ({uri, cachedInitialEvent}) => {
        console.log(
          'subscribe onOpenStart, will open ' +
            uri +
            ' cachedInitialEvent is ' +
            cachedInitialEvent,
        );
      },
      onOpenComplete: ({error, params, uri}) => {
        if (error) {
          console.error(
            'subscribe onOpenComplete, Error from opening uri: ' +
              uri +
              ' error: ' +
              error,
          );
          return;
        } else if (params) {
          if (!params['+clicked_branch_link']) {
            if (params['+non_branch_link']) {
              console.log('non_branch_link: ' + uri);
              // Route based on non-Branch links
              return;
            }
          } else {
            // Handle params
            let deepLinkPath = params.$deeplink_path as string;
            let canonicalUrl = params.$canonical_url as string;
            console.log('deepLinkPath: ' + deepLinkPath);
            console.log('canonicalUrl: ' + canonicalUrl);
            // Route based on Branch link data
            return;
          }
        }
      },
    });

    let latestParams = await branch.getLatestReferringParams(); // Params from last open
    let installParams = await branch.getFirstReferringParams(); // Params from original install
    console.log('latestParams: ' + JSON.stringify(latestParams));
    console.log('installParams: ' + JSON.stringify(installParams));
  };

  useEffect(() => {
    initBranch();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
