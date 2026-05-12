import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { resume } from "../data/resume";
import { useTheme } from "../theme/ThemeContext";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProfileCardScreen({ navigation }) {
  const { colors, mode, toggle } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.05, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [pulse]);
  const avatarAnim = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const btnScale = useSharedValue(1);
  const btnAnim = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const styles = makeStyles(colors, isTablet);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ===== Gradient Header ===== */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.cardWrap}>
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <View style={styles.topBar}>
              <TouchableOpacity testID="menu-btn" style={styles.iconBtn} activeOpacity={0.7}>
                <Ionicons name="menu" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                testID="theme-toggle-btn"
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={toggle}
              >
                <Ionicons name={mode === "light" ? "moon" : "sunny"} size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <Animated.View style={[styles.avatarOuter, avatarAnim]}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={64} color={colors.primary} />
              </View>
            </Animated.View>
          </LinearGradient>

          {/* ===== Identity ===== */}
          <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.identity}>
            <Text testID="profile-name" style={styles.name}>{resume.name}</Text>
            <Text style={styles.course}>{resume.course}</Text>
            <Text style={styles.school}>{resume.school}</Text>

            <View style={styles.taglinePill}>
              <Ionicons name="sparkles" size={14} color={colors.primary} />
              <Text style={styles.taglineText}>{resume.tagline}</Text>
            </View>
          </Animated.View>

          <View style={styles.divider} />

          {/* ===== About ===== */}
          <Animated.View entering={FadeInDown.delay(250).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.aboutText}>{resume.about}</Text>
          </Animated.View>

          {/* ===== Skills ===== */}
          <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.chipsRow}>
              {resume.skills.slice(0, 10).map((s, i) => (
                <Animated.View
                  key={s}
                  entering={FadeInDown.delay(400 + i * 40).duration(400)}
                  style={styles.chip}
                >
                  <Text style={styles.chipText}>{s}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* ===== CTA ===== */}
          <View style={styles.ctaWrap}>
            <AnimatedTouchable
              testID="view-portfolio-btn"
              activeOpacity={0.9}
              onPressIn={() => (btnScale.value = withSpring(0.96))}
              onPressOut={() => (btnScale.value = withSpring(1))}
              onPress={() => navigation.navigate("PortfolioDetails")}
              style={[styles.cta, btnAnim]}
            >
              <LinearGradient
                colors={colors.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaInner}
              >
                <Ionicons name="eye-outline" size={20} color="#fff" />
                <Text style={styles.ctaText}>View Portfolio</Text>
              </LinearGradient>
            </AnimatedTouchable>
          </View>
        </Animated.View>

        {/* ===== Bottom Tabs (visual) ===== */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.bottomTabs}>
          <View style={styles.tabItem}>
            <Ionicons name="person-circle-outline" size={22} color={colors.primary} />
            <Text style={[styles.tabLabel, { color: colors.primary }]}>Profile</Text>
          </View>
          <View style={styles.tabSeparator} />
          <TouchableOpacity
            testID="portfolio-tab-btn"
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("PortfolioDetails")}
          >
            <Ionicons name="briefcase-outline" size={22} color={colors.textMuted} />
            <Text style={[styles.tabLabel, { color: colors.textMuted }]}>Portfolio</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (c, isTablet) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: c.background },
    scroll: { paddingHorizontal: 16, paddingBottom: 32, alignItems: "center" },
    cardWrap: {
      width: "100%",
      maxWidth: isTablet ? 520 : "100%",
      backgroundColor: c.card,
      borderRadius: 28,
      overflow: "hidden",
      marginTop: 12,
      ...Platform.select({
        ios: { shadowColor: c.shadow, shadowOpacity: 0.15, shadowOffset: { width: 0, height: 12 }, shadowRadius: 24 },
        android: { elevation: 8 },
        default: { shadowColor: c.shadow, shadowOpacity: 0.12, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24 },
      }),
    },
    gradientHeader: {
      paddingTop: 14, paddingBottom: 70, paddingHorizontal: 18,
      borderBottomLeftRadius: 40, borderBottomRightRadius: 40,
    },
    topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    iconBtn: {
      width: 38, height: 38, borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.18)",
      alignItems: "center", justifyContent: "center",
    },
    avatarOuter: {
      position: "absolute", bottom: -55, alignSelf: "center",
      width: 130, height: 130, borderRadius: 65,
      backgroundColor: "#fff", padding: 6,
      ...Platform.select({
        ios: { shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12 },
        android: { elevation: 10 },
      }),
    },
    avatarInner: {
      flex: 1, borderRadius: 60, backgroundColor: c.primaryLight,
      alignItems: "center", justifyContent: "center",
    },
    identity: { marginTop: 70, alignItems: "center", paddingHorizontal: 20 },
    name: { fontSize: 24, fontWeight: "800", color: c.text, textAlign: "center" },
    course: { fontSize: 16, fontWeight: "700", color: c.primary, marginTop: 6, textAlign: "center" },
    school: { fontSize: 14, color: c.textMuted, marginTop: 2, textAlign: "center" },
    taglinePill: {
      flexDirection: "row", alignItems: "center", gap: 6,
      backgroundColor: c.primaryLight,
      paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, marginTop: 16,
    },
    taglineText: { color: c.primary, fontWeight: "600", fontSize: 13 },
    divider: { height: 1, backgroundColor: c.border, marginVertical: 20, marginHorizontal: 20 },
    section: { paddingHorizontal: 20, marginBottom: 18 },
    sectionTitle: { fontSize: 17, fontWeight: "800", color: c.text, marginBottom: 10 },
    aboutText: { fontSize: 14, lineHeight: 22, color: c.textMuted },
    chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999,
      borderWidth: 1, borderColor: c.primary, backgroundColor: c.chipBg,
    },
    chipText: { color: c.chipText, fontWeight: "600", fontSize: 12 },
    ctaWrap: { padding: 20, paddingTop: 8 },
    cta: {
      borderRadius: 16, overflow: "hidden",
      ...Platform.select({
        ios: { shadowColor: c.primary, shadowOpacity: 0.35, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12 },
        android: { elevation: 6 },
      }),
    },
    ctaInner: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 10, paddingVertical: 16,
    },
    ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    bottomTabs: {
      flexDirection: "row", alignItems: "center", justifyContent: "space-around",
      backgroundColor: c.card, borderRadius: 20, paddingVertical: 12, paddingHorizontal: 16,
      marginTop: 16, width: "100%", maxWidth: isTablet ? 520 : "100%",
      ...Platform.select({
        ios: { shadowColor: c.shadow, shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 },
        android: { elevation: 4 },
      }),
    },
    tabItem: { alignItems: "center", flex: 1, gap: 2 },
    tabLabel: { fontSize: 12, fontWeight: "600" },
    tabSeparator: { width: 1, height: 24, backgroundColor: c.border },
  });
