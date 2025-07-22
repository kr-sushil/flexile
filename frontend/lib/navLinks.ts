import {
  Briefcase,
  Building,
  ChartPie,
  CreditCard,
  Files,
  Landmark,
  type LucideIcon,
  PieChart,
  ReceiptIcon,
  Rss,
  ScrollText,
  Settings,
  UserCircle2,
  Users,
} from "lucide-react";
import type { Route } from "next";
import type { Company, CurrentUser } from "@/models/user";

export interface NavType {
  label: string;
  route: Route;
  icon: LucideIcon;
  isVisible: boolean;
  isActive: boolean;
}

export interface NavMainType {
  label: string;
  route?: Route;
  icon: LucideIcon;
  isVisible: boolean;
  isActive: boolean;
  badge?: number;
  children?: {
    label: string;
    route: Route;
    isVisible: boolean;
    isActive: boolean;
  }[];
  tabPriority: number; // Mobile menu priority
}

export const getNavEquity = (user: CurrentUser, company: Company, pathname: string) => {
  const isAdmin = !!user.roles.administrator;
  const isLawyer = !!user.roles.lawyer;
  const isInvestor = !!user.roles.investor;
  const { flags } = company;

  const nav: {
    label: string;
    route: Route;
    isVisible: boolean;
    isActive: boolean;
  }[] = [
    {
      label: "Cap table",
      route: "/equity/cap_table",
      isVisible: flags.includes("cap_table") && (isAdmin || isLawyer || isInvestor),
      isActive: pathname === "/equity/cap_table",
    },
    {
      label: "Option pools",
      route: "/equity/option_pools",
      isVisible: flags.includes("equity_grants") && (isAdmin || isLawyer),
      isActive: pathname === "/equity/option_pools",
    },
    {
      label: "Equity grants",
      route: "/equity/grants",
      isVisible: flags.includes("equity_grants") && (isAdmin || isLawyer),
      isActive: pathname === "/equity/grants",
    },
    {
      label: "Options",
      route: "/equity/options",
      isVisible: flags.includes("equity_grants") && isInvestor && !!user.roles.investor?.hasGrants,
      isActive: pathname === "/equity/options",
    },
    {
      label: "Shares",
      route: "/equity/shares",
      isVisible: isInvestor && !!user.roles.investor?.hasShares,
      isActive: pathname === "/equity/shares",
    },
    {
      label: "Convertibles",
      route: "/equity/convertibles",
      isVisible: isInvestor && !!user.roles.investor?.hasConvertibles,
      isActive: pathname === "/equity/convertibles",
    },
    {
      label: "Dividends",
      route: `/equity/${isInvestor ? "dividends" : "dividend_rounds"}`,
      isVisible: isInvestor || (flags.includes("dividends") && (isAdmin || isLawyer)),
      isActive: pathname === `/equity/${isInvestor ? "dividends" : "dividend_rounds"}`,
    },
    {
      label: "Buybacks",
      route: "/equity/tender_offers",
      isVisible: flags.includes("tender_offers") && (isAdmin || isInvestor),
      isActive: pathname === "/equity/tender_offers",
    },
  ];

  return nav.filter((link) => link.isVisible);
};

export const getNavMain = (
  user: CurrentUser,
  company: Company,
  pathname: string,
  otherInfo: { badge: { invoices: number; documents: number } },
) => {
  const routes = new Set(
    company.routes.flatMap((route) => [route.label, ...(route.subLinks?.map((subLink) => subLink.label) || [])]),
  );
  const nav: NavMainType[] = [
    {
      label: "Updates",
      route: "/updates/company",
      icon: Rss,
      isVisible: routes.has("Updates"),
      isActive: pathname.startsWith("/updates"),
      tabPriority: 4,
    },
    {
      label: "Invoices",
      route: "/invoices",
      icon: ReceiptIcon,
      isVisible: routes.has("Invoices"),
      isActive: pathname.startsWith("/invoices"),
      badge: otherInfo.badge.invoices,
      tabPriority: 1,
    },
    {
      label: "Documents",
      route: "/documents",
      icon: Files,
      isVisible: routes.has("Documents"),
      isActive: pathname.startsWith("/documents") || pathname.startsWith("/document_templates"),
      badge: otherInfo.badge.documents,
      tabPriority: 2,
    },
    {
      label: "People",
      route: "/people",
      icon: Users,
      isVisible: routes.has("People"),
      isActive: pathname.startsWith("/people") || pathname.includes("/investor_entities/"),
      tabPriority: 5,
    },
    {
      label: "Equity",
      icon: ChartPie,
      isVisible: routes.has("Equity"),
      isActive: false,
      children: getNavEquity(user, company, pathname),
      tabPriority: 3,
    },
    {
      label: "Settings",
      icon: Settings,
      isVisible: true,
      isActive: pathname.startsWith("/settings"),
      tabPriority: 6,
    },
  ];

  return nav.filter((link) => link.isVisible);
};

export const getNavPersonalSettings = (user: CurrentUser, pathname: string) => {
  const nav: NavType[] = [
    {
      label: "Profile",
      route: "/settings",
      icon: UserCircle2,
      isVisible: true,
      isActive: pathname === "/settings",
    },
    {
      label: "Payouts",
      route: "/settings/payouts",
      icon: Landmark,
      isVisible: !!user.roles.worker || !!user.roles.investor,
      isActive: pathname === "/settings",
    },
    {
      label: "Tax information",
      route: "/settings/tax",
      icon: ScrollText,
      isVisible: !!user.roles.worker || !!user.roles.investor,
      isActive: pathname === "/settings",
    },
  ];
  return nav.filter((link) => link.isVisible);
};

export const getNavCompanySettings = (user: CurrentUser, pathname: string) => {
  const nav: NavType[] = [
    {
      label: "Workspace settings",
      route: "/settings/administrator",
      icon: Building,
      isVisible: !!user.roles.administrator,
      isActive: pathname === "/settings",
    },
    {
      label: "Company details",
      route: "/settings/administrator/details",
      icon: Briefcase,
      isVisible: !!user.roles.administrator,
      isActive: pathname === "/settings",
    },
    {
      label: "Billing",
      route: "/settings/administrator/billing",
      icon: CreditCard,
      isVisible: !!user.roles.administrator,
      isActive: pathname === "/settings",
    },
    {
      label: "Equity value",
      route: "/settings/administrator/equity",
      icon: PieChart,
      isVisible: !!user.roles.administrator,
      isActive: pathname === "/settings",
    },
  ];
  return nav.filter((link) => link.isVisible);
};
