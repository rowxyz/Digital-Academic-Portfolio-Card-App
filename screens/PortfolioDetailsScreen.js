import React from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Linking, Platform, useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { resume } from "../data/resume";
import { useTheme } from "../theme/ThemeContext";

export default function PortfolioDetailsScreen({ navigation }) {
  const { colors, mode, toggle } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const styles = makeStyles(colors, isTablet);

  const openEmail = () => Linking.openURL(`mailto:${resume.contact.email}`);
  const openPhone = () => Linking.openURL(`tel:${resume.contact.phone.replace(/\s/g, "")}`);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <TouchableOpacity
          testID="back-btn-top"
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfolio Details</Text>
        <TouchableOpacity
          testID="theme-toggle-btn-detail"
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={toggle}
        >
          <Ionicons name={mode === "light" ? "moon" : "sunny"} size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ===== About ===== */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <InfoRow icon="person-outline" label="Name" value={resume.name} color={colors} />
          <InfoRow icon="book-outline" label="Course" value={resume.course} color={colors} />
          <InfoRow icon="school-outline" label="University" value={resume.school} color={colors} last />
        </Animated.View>

        {/* ===== Skills ===== */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>Skills</Text>
          {resume.skillCategories.map((cat, i) => (
            <View key={cat.title} style={{ marginBottom: i === resume.skillCategories.length - 1 ? 0 : 14 }}>
              <Text style={styles.subTitle}>{cat.title}</Text>
              <View style={styles.chipsRow}>
                {cat.items.map((item) => (
                  <View key={item} style={styles.chip}>
                    <Text style={styles.chipText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ===== Projects ===== */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>Projects</Text>
          {resume.projects.map((p, i) => (
            <Animated.View
              key={p.title}
              entering={FadeInRight.delay(200 + i * 80).duration(400)}
              style={[styles.projectRow, i === resume.projects.length - 1 && { marginBottom: 0 }]}
            >
              <View style={[styles.projectIcon, { backgroundColor: p.color + "22" }]}>
                <Ionicons name={p.icon} size={26} color={p.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.projectTitle}>{p.title}</Text>
                <Text style={styles.projectDesc}>{p.description}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* ===== Certifications ===== */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>Achievements / Certifications</Text>
          {resume.certifications.map((cert, i) => (
            <View
              key={cert.title}
              style={[styles.certRow, i === resume.certifications.length - 1 && { marginBottom: 0 }]}
            >
              <View style={styles.certIcon}>
                <Ionicons name="trophy" size={16} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.certTitle}>{cert.title}</Text>
                <Text style={styles.certMeta}>{cert.issuer} • {cert.date}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ===== Education ===== */}
        <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>Education</Text>
          {resume.education.map((ed, i) => (
            <View key={ed.school + ed.year} style={styles.eduRow}>
              <View style={styles.timelineDot} />
              {i !== resume.education.length - 1 && <View style={styles.timelineLine} />}
              <View style={{ flex: 1, paddingLeft: 16, paddingBottom: 14 }}>
                <Text style={styles.eduDegree}>{ed.degree}</Text>
                <Text style={styles.eduSchool}>{ed.school}</Text>
                <Text style={styles.eduYear}>
                  {ed.year}{ed.detail ? ` · ${ed.detail}` : ""}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ===== Contact ===== */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.card}>
          <Text style={styles.cardTitle}>Contact</Text>
          <TouchableOpacity testID="contact-email" activeOpacity={0.7} style={styles.contactRow} onPress={openEmail}>
            <View style={[styles.contactIcon, { backgroundColor: "#EEF0FF" }]}>
              <Ionicons name="mail" size={18} color={colors.primary} />
            </View>
            <Text style={styles.contactText}>{resume.contact.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity testID="contact-phone" activeOpacity={0.7} style={styles.contactRow} onPress={openPhone}>
            <View style={[styles.contactIcon, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons name="call" size={18} color="#16A34A" />
            </View>
            <Text style={styles.contactText}>{resume.contact.phone}</Text>
          </TouchableOpacity>

          <View style={styles.contactRow}>
            <View style={[styles.contactIcon, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="location" size={18} color="#D97706" />
            </View>
            <Text style={styles.contactText}>{resume.contact.address}</Text>
          </View>
        </Animated.View>

        {/* ===== Back CTA ===== */}
        <TouchableOpacity
          testID="back-btn-bottom"
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
          style={styles.backCta}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
          <Text style={styles.backCtaText}>Back to Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------- Reusable InfoRow ---------- */
const InfoRow = ({ icon, label, value, color, last }) => (
  <View
    style={{
      flexDirection: "row", alignItems: "center", paddingVertical: 12,
      borderBottomWidth: last ? 0 : 1, borderBottomColor: color.border,
    }}
  >
    <View
      style={{
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: color.primaryLight,
        alignItems: "center", justifyContent: "center", marginRight: 14,
      }}
    >
      <Ionicons name={icon} size={18} color={color.primary} />
    </View>
    <Text style={{ color: color.textMuted, width: 90, fontSize: 13 }}>{label}</Text>
    <Text style={{ flex: 1, color: color.text, fontSize: 14, fontWeight: "600" }}>{value}</Text>
  </View>
);

const makeStyles = (c, isTablet) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: c.background },
    header: {
      flexDirection: "row", alignItems: "center", justifyContent: "space-between",
      paddingHorizontal: 16, paddingVertical: 12,
    },
    headerIconBtn: {
      width: 40, height: 40, borderRadius: 12, backgroundColor: c.card,
      alignItems: "center", justifyContent: "center",
      ...Platform.select({
        ios: { shadowColor: c.shadow, shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6 },
        android: { elevation: 2 },
      }),
    },
    headerTitle: { fontSize: 17, fontWeight: "800", color: c.text },
    scroll: { paddingHorizontal: 16, paddingBottom: 32, alignItems: "center" },
    card: {
      width: "100%", maxWidth: isTablet ? 640 : "100%",
      backgroundColor: c.card, borderRadius: 20, padding: 18, marginBottom: 14,
      ...Platform.select({
        ios: { shadowColor: c.shadow, shadowOpacity: 0.07, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14 },
        android: { elevation: 3 },
        default: { shadowColor: c.shadow, shadowOpacity: 0.07, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      }),
    },
    cardTitle: { fontSize: 16, fontWeight: "800", color: c.text, marginBottom: 8 },
    subTitle: { fontSize: 13, fontWeight: "700", color: c.textMuted, marginBottom: 8 },
    chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
      borderWidth: 1, borderColor: c.primary, backgroundColor: c.chipBg,
    },
    chipText: { color: c.chipText, fontWeight: "600", fontSize: 12 },
    projectRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14 },
    projectIcon: {
      width: 54, height: 54, borderRadius: 16,
      alignItems: "center", justifyContent: "center",
    },
    projectTitle: { fontSize: 15, fontWeight: "700", color: c.text },
    projectDesc: { fontSize: 13, color: c.textMuted, marginTop: 4, lineHeight: 19 },
    certRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 },
    certIcon: {
      width: 26, height: 26, borderRadius: 13, backgroundColor: "#F59E0B",
      alignItems: "center", justifyContent: "center", marginTop: 2,
    },
    certTitle: { fontSize: 14, color: c.text, fontWeight: "600" },
    certMeta: { fontSize: 12, color: c.textMuted, marginTop: 2 },
    eduRow: { flexDirection: "row", position: "relative" },
    timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: c.primary, marginTop: 4 },
    timelineLine: { position: "absolute", left: 5, top: 16, bottom: -2, width: 2, backgroundColor: c.border },
    eduDegree: { fontSize: 14, fontWeight: "700", color: c.text },
    eduSchool: { fontSize: 13, color: c.primary, marginTop: 2 },
    eduYear: { fontSize: 12, color: c.textMuted, marginTop: 2 },
    contactRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
    contactIcon: {
      width: 36, height: 36, borderRadius: 18,
      alignItems: "center", justifyContent: "center", marginRight: 12,
    },
    contactText: { fontSize: 14, color: c.text, fontWeight: "500", flex: 1 },
    backCta: {
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
      paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16,
      borderWidth: 2, borderColor: c.primary, backgroundColor: c.card,
      width: "100%", maxWidth: isTablet ? 640 : "100%", marginTop: 4,
    },
    backCtaText: { color: c.primary, fontWeight: "700", fontSize: 15 },
  });
